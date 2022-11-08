window.addEventListener('load', function() {
  document.addEventListener("click", function (e) {
    console.log("Clicked");
    fetch('https://www.zomato.com/partners/onlineordering')
    .then(res => console.log(res))
    .then(response => console.log(response))
//    .catch(error => console.log('ERROR'))
  },{once : true});
});
/*
chrome.webRequest.onBeforeRequest.addListener(function(data){
    // data contains request_body
},{'urls':[]},['requestBody']);
*/


/*
window.onclick = function(event) {
    var target = event.target ;
    if(target.matches('#clickactivity')) {
        var clickedEle = document.activeElement.id ;
        var ele = document.getElementById(clickedEle);
        alert(ele.text);
    }
}
*/
