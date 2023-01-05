var $j = jQuery.noConflict();

async function getUserId() {
    const data = await fetch('https://www.zomato.com/restaurant-onboard-diy/check-auth')
        .then((response) => response.json())
    return data.userId
}

async function getRestaurantIds() {
    const data = await fetch('https://www.zomato.com/merchant-api/home/secondary-config')
        .then((response) => response.json())
    return Object.keys(data.restaurants_config)
}

$j(document).ready(function () {
    async function getZomato() {
        console.log("I am in zomato land")
        const socket = io("https://cc2.zomato.com/");
        const user = await getUserId();
        console.log("The user id is displayed", user)
        const restaurantIds = await getRestaurantIds();
        console.log("The restaurant id is displayed",restaurantIds);
        socket.connect();
        socket.on('hello', () => {
            console.log("In hello");
            socket.emit('yello', {
                user,
                userId: user,
                resIds: restaurantIds,
                client: 'web',
                version: '2',
            });
            console.log("The orders has been printed")
        });

        socket.on('res_order', data => {
            console.log("Received order")
            console.log("the data is printed", data.tabId)
            io.emit(data.tabId)
            fetch('https://www.zomato.com/merchant-api/orders/order-details?tab_id=', data.tabId)
            .then((response) => response.json())
            .then((data) => {
                console.log("The response data is here", data)
                fetch('https://pos.appscomp.in/get/zomato', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                console.log("these data's has been send to Odoo Server")
            });
            console.log("End of the function")
        });
//        socket.on('res_order', data => {
//            console.log("Received order")
//            fetch('https://pos.appscomp.in/get/zomato', {
//                method: 'POST',
//                mode: 'no-cors',
//                headers: {
//                    'Content-Type': 'application/json',
//                },
//                body: JSON.stringify(data),
//            })
//            console.log("the data is printed", JSON.stringify(data),data)
//        });
//        setTimeout(getZomato, 5000);
//        console.log("The 5 seconds condition is working")
    }

    function getSwiggy() {
        fetch('https://partner.swiggy.com/orders/v1/fetch')
            .then((response) => response.json())
            .then((data) => {
                console.log("The response data is here", data)
                fetch('https://pos.appscomp.in/get/swiggy', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
            });
//        setTimeout(getZomato, 5000);
//        console.log("The 5 seconds condition is working")
    }

    const url = location.href;
    if (url.startsWith("https://partner.swiggy.com/")) {
        getSwiggy();
    } else {
        getZomato();
    }
});
