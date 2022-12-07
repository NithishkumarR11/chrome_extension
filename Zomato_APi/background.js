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
        const restaurantIds = await getRestaurantIds();
        console.log(user);
        console.log(restaurantIds);
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
        });

        socket.on('res_order', data => {
            console.log("Received order")
            fetch('https://pos.appscomp.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
        });
    }

    function getSwiggy() {
        fetch('https://partner.swiggy.com/orders/v1/fetch')
            .then((response) => response.json())
            .then((data) => {
                console.log("The response data is here", data)
                fetch('https://pos.appscomp.in/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
            });
    }

    const url = location.href;
    if (url.startsWith("https://partner.swiggy.com/")) {
        getSwiggy();
    } else {
        getZomato();
    }
});
