/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {
	
  //////////////////////////
  // Cards Page Controller //
  //////////////////////////
  cardsPage: function(page){
      page.querySelector('[id="prevButton"]').onclick = function() {
  	    var carousel = document.getElementById('carousel');
  	    carousel.prev();
      };
	  
      page.querySelector('[id="nextButton"]').onclick = function() {
  	    var carousel = document.getElementById('carousel');
  	    carousel.next();
      };
	  
	  ons.ready(function() {
	    var carousel = document.addEventListener('postchange', function(event) {
	      console.log('Changed to ' + event.activeIndex)
			if (event.activeIndex!=undefined){//ruby 和js对0视为true还是false的坑
				myApp.services.currentIdx = event.activeIndex+1;
				document.getElementById("codeIdx").innerHTML=""+(event.activeIndex+1)+"/"+myApp.services.names.length;
			}
	    });
	  });
  },
  

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {

    // Set button functionality to push 'new_task.html' page.
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/feedback"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('html/new_feedback.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });

    // Change tabbar animation depending on platform.
    page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  ////////////////////////
  // Menu Page Controller //
  ////////////////////////
  menuPage: function(page) {
    // Set functionality for 'No Category' and 'All' default categories respectively.
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item[category-id=""]'));
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item:not([category-id])'));
  },

  ////////////////////////////
  // New Feedback Page Controller //
  ////////////////////////////
  newFeedbackPage: function(page) {
    // Set button functionality to save a new task.
	page.querySelector('#code-input').value = myApp.services.currentIdx;	
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/save"]'), function(element) {
      element.onclick = function() {
        var code = page.querySelector('#code-input').value;
		var desc = page.querySelector('#description-input').value;
		
        if (desc && desc.length>0) {
          // If input title is not empty, create a new task.
          myApp.services.feedbacks.create(
            {
             	   code: code,
              	   desc: desc,
              	   photo: page.querySelector('#photo-input').checked,
				   error: page.querySelector('#error-input').checked
            }
          );

        } else {
          // Show alert if the input title is empty.
          ons.notification.alert('请注明正确的学生姓名，以便于作者进行修正.');
        }
      };
    });
  },
  
  testsPage: function(page) {
	  // 创建题目
	  myApp.services.tests.init();	  
		
	  for(var i =0; i<4; i++){
		var choice = document.getElementById("radio-"+i);
		choice.addEventListener('click',function(){
			var choiceId = this.idx;
			var thisLabel = document.getElementById("label"+choiceId);
			if(!thisLabel)return;
			Array.prototype.forEach.call(page.querySelectorAll('[name="name"]'), function(element) {
				element.disabled=true;
			});			
			var currentQuestion = myApp.services.tests.questions[myApp.services.tests.currentIdx];
	          var realName = currentQuestion["realName"];
			var currentName = currentQuestion["names"][choiceId];
			if (realName == currentName){
				console.log("correct");
				console.log(myApp.services.currentScore);
				myApp.services.currentScore+=5;
				myApp.services.tests.updateScore();
				thisLabel.style.color="green";
				setTimeout(function(){myApp.services.tests.nextLevel()}, 100);
			
			}else{
				thisLabel.style.color="red";
				var correctIdx = currentQuestion["names"].indexOf(currentQuestion["realName"]);
				var correctLabel = document.getElementById("label"+correctIdx);
				correctLabel.style.color="green";
				console.log("wrong" + choiceId);
				setTimeout(function(){myApp.services.tests.nextLevel()}, 500);
			}	 
		});
	}
	  
	  
	  page.querySelector("#resetButton").onclick = function(){
		  myApp.services.tests.init();
	  }
  },

  ////////////////////////////////
  // Details Task Page Controller //
  ///////////////////////////////
  detailsTaskPage: function(page) {
    // Get the element passed as argument to pushPage.
    var element = page.data.element;

    // Fill the view with the stored data.
    page.querySelector('#title-input').value = element.data.title;
    page.querySelector('#category-input').value = element.data.category;
    page.querySelector('#description-input').value = element.data.description;
    page.querySelector('#highlight-input').checked = element.data.highlight;
    page.querySelector('#urgent-input').checked = element.data.urgent;

    // Set button functionality to save an existing task.
    page.querySelector('[component="button/save-task"]').onclick = function() {
      var newTitle = page.querySelector('#title-input').value;

      if (newTitle) {
        // If input title is not empty, ask for confirmation before saving.
        ons.notification.confirm(
          {
            title: 'Save changes?',
            message: 'Previous data will be overwritten.',
            buttonLabels: ['Discard', 'Save']
          }
        ).then(function(buttonIndex) {
          if (buttonIndex === 1) {
            // If 'Save' button was pressed, overwrite the task.
            myApp.services.tasks.update(element,
              {
                title: newTitle,
                category: page.querySelector('#category-input').value,
                description: page.querySelector('#description-input').value,
                ugent: element.data.urgent,
                highlight: page.querySelector('#highlight-input').checked
              }
            );

            // Set selected category to 'All', refresh and pop page.
            document.querySelector('#default-category-list ons-list-item ons-input').checked = true;
            document.querySelector('#default-category-list ons-list-item').updateCategoryView();
            document.querySelector('#myNavigator').popPage();
          }
        });

      } else {
        // Show alert if the input title is empty.
        ons.notification.alert('You must provide a task title.');
      }
    };
  }
};
