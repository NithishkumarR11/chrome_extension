var $j = jQuery.noConflict();

$j(document).ready(function () {
    function getZomato() {
        fetch('https://www.zomato.com/merchant-api/v3/notifications/fetch')
            .then((response) => response.json())
            .then((data) => {
            console.log("The response data is here", data)
                fetch('https://pos.appscomp.in/api/login', {
                    method: 'POST',
                    mode: 'no-cors',
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
