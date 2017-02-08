// App logic.
window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;


  // Fill the lists with initial data when the pages we need are ready.
  // This only happens once at the beginning of the app.
  if (page.id === 'menuPage' || page.id === 'cardsPage') {
    if (document.querySelector('#menuPage') && document.querySelector('#cardsPage')) {
		var i = 0;
		myApp.services.names.forEach(function(name){
			myApp.services.cards.create(name,i)
			i++;
		});
    }
  }
  
  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }
  
});
