window.addEventListener('load', function() {
  document.addEventListener("click", function (e) {
    console.log("Clicked");
    alert("Clicked");
  },{once : true});
});


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
