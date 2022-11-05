const init = function(){
  const injectElement = document.createElement('div');
  injectElement.className = 'test-element';
  injectElement.innerHTML = 'Hello, This is Content is applied here';
  document.body.appendChild(injectElement);
//  alert("The Content is added")
}
init();