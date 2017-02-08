/***********************************************************************************
 * App Services. This contains the logic of the application organised in modules/objects. *
 ***********************************************************************************/

////////
//ajax//
////////
var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};

ajax.post = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url, callback, 'POST', query.join('&'), async);
};

myApp.services = {
  //////////////////
  // Card Service //
  //////////////////
	currentIdx:1,
	currentScore:0,
	host:"http://sf.diosapp.com.cn",
	names:["朱吉成", "陈与书", "邢毅珏", "陈子妍", "杨紫逸", "范天煜", "王佳怡", "傅家欣", "奚铭豪", "王乙萱", "王绍隐", "杨伯文", "刘闵杰", "曾可颐", "尚佳琪", "周紫依", "祝越", "刘毅舟", "闵涵鋆", "艾家宝", "易予佳", "王子曦", "侯霁芸", "康子怡", "张安慧", "伍睿", "吴锐", "张子涵", "刘嘉毅", "胡艾妮", "黄雨晨", "段存瀚", "唐骏扬", "张书祯", "张华杰", "金博文", "曹艺欣", "彭旭崑", "左米玉", "瞿恺忻", "严诗雨", "罗妍晖", "陆俊屹", "路晨曦", "邹骏晖", "孙姮", "张盛宇", "朱辰昊", "郝郁郁", "潘圣琦", "柳子涵", "李涵", "王奕婷", "宋烨晨", "严永恒", "韦佳仪", "李俊逸", "贾梓越", "鞠于欣", "黄智俊", "符蓉", "顾筱语", "郑宇昂", "管奕凌", "常灏缤", "白漪洋", "邬俊逸", "康宁"],	
	cards:{
		create:function(name,idx){
			var template = document.createElement('div');
			template.innerHTML = 
			'<ons-carousel-item>'+
        		'<div style="text-align: center; font-size: 30px; margin-top: 20px; color: #000;">'+
					name+
			    '</div>'+
				'<img width="100%" src="'+"images/"+idx+".jpg"+'"'+">"+
			'</ons-carousel-item>';
			
			var cardItem = template.firstChild;
	        var carousel = document.querySelector('#carousel');
	        carousel.insertBefore(cardItem,null);
			carousel.refresh(); // 这是个坑
		}
	},
	
  ////////////////
  //Test Service//
  ////////////////
  tests:{
	  currentIdx:1,
	  totalCount:20,
	  questions:{},
	  init:function(){
		  myApp.services.tests.currentIdx=1;
		  myApp.services.currentScore=0;
		  myApp.services.tests.questions={};
		  for(var i=1;i<=myApp.services.tests.totalCount;i++){
		  	//Generate Question
			//randomCode
			var randomnumber = Math.floor(Math.random()*myApp.services.names.length);
			var realName = myApp.services.names[randomnumber];
			var fakeNames = [];
			fakeNames.push(realName);
			while(fakeNames.length<4){
				var randIdx = Math.floor(Math.random()*myApp.services.names.length);
				var randName = myApp.services.names[randIdx];
				if(fakeNames.indexOf(randName)==-1){
					fakeNames.push(randName);
				}
			}
			myApp.services.tests.questions[i] = {code:randomnumber,realName:realName,names:fakeNames.sort(function(a,b){return Math.random()-0.5})};
		  }
		  console.log(myApp.services.tests.questions);
		  myApp.services.tests.showCurrentQuestion();
	  },
	  updateScore: function(){
		document.getElementById("currentScore").innerHTML = "" + myApp.services.currentScore;
	  },
	  nextLevel: function(){
		  if (myApp.services.tests.currentIdx<myApp.services.tests.totalCount){
		  	myApp.services.tests.currentIdx++;
		  	myApp.services.tests.showCurrentQuestion();
	 	 }else{
			if (myApp.services.currentScore>=5*myApp.services.tests.totalCount){
				alert("哇哦，全对，不错哟！");
			}else if (myApp.services.currentScore>=5*myApp.services.tests.totalCount*0.9){
				alert("已经记住了大部分笑脸，加油！")
			}else if (myApp.services.currentScore>=5*myApp.services.tests.totalCount*0.7){
				alert("你是脸盲么？回去加强记忆！")
			}else if (myApp.services.currentScore>5*myApp.services.tests.totalCount*0.3){
				alert("你是闭着眼睛乱点的吧，不想评论！")
			}else{
				alert("据说让猴子在手机前乱点也别你得分高呢！")
			}
	 	 }
	  },
	  showCurrentQuestion:function(){
		myApp.services.tests.updateScore();  
		var currentQuestion = myApp.services.tests.questions[myApp.services.tests.currentIdx];
		document.getElementById("testImg").src="images/"+(currentQuestion["code"])+".jpg";
		document.getElementById("testIdx").innerHTML=""+myApp.services.tests.currentIdx+"/"+myApp.services.tests.totalCount;
		console.log(currentQuestion);
		
		for (var i=0;i<currentQuestion["names"].length;i++){
			var label = document.getElementById("label"+i);
			label.innerHTML = currentQuestion["names"][i];
			label.style.color="black";
			var choice = document.getElementById("radio-"+i);
			choice.checked = false;
			choice.idx = i;
			choice.disabled = false;
		}		
	  },
  },
	
	
  //////////////////////
  // Feedback Service //
  //////////////////////
  feedbacks:{
	  create:function(data){
		  ajax.post(myApp.services.host+"/feedbacks.json",data,function(response){
			  if (response && JSON.parse(response).id){
				  alert("已提交成功，作者将尽快处理。单号："+JSON.parse(response).id);
			  }else{
			  	  alert("作者可能睡着了，不太想理你。");
			  }
		  });
	  }
  },
  
  

  /////////////////
  // Task Service //
  /////////////////
  tasks: {

    // Creates a new task and attaches it to the pending task list.
    create: function(data) {
      // Task item template.
      var template = document.createElement('div');
      template.innerHTML =
        '<ons-list-item tappable category="' + myApp.services.categories.parseId(data.category)+ '">' +
          '<label class="left">' +
           '<ons-input type="checkbox"></ons-input>' +
          '</label>' +
          '<div class="center">' +
            data.title +
          '</div>' +
          '<div class="right">' +
            '<ons-icon style="color: grey; padding-left: 4px" icon="ion-ios-trash-outline, material:md-delete"></ons-icon>' +
          '</div>' +
        '</ons-list-item>'
      ;

      // Takes the actual task item.
      var taskItem = template.firstChild;
      // Store data within the element.
      taskItem.data = data;

      // Add 'completion' functionality when the checkbox changes.
      taskItem.data.onCheckboxChange = function(event) {
        myApp.services.animators.swipe(taskItem, function() {
          var listId = (taskItem.parentElement.id === 'pending-list' && event.target.checked) ? '#completed-list' : '#pending-list';
          document.querySelector(listId).appendChild(taskItem);
        });
      };

      taskItem.addEventListener('change', taskItem.data.onCheckboxChange);

      // Add button functionality to remove a task.
      taskItem.querySelector('.right').onclick = function() {
        myApp.services.tasks.remove(taskItem);
      };

      // Add functionality to push 'details_task.html' page with the current element as a parameter.
      taskItem.querySelector('.center').onclick = function() {
        document.querySelector('#myNavigator')
          .pushPage('html/details_task.html',
            {
              animation: 'lift',
              data: {
                element: taskItem
              }
            }
          );
      };

      // Check if it's necessary to create new categories for this item.
      myApp.services.categories.updateAdd(taskItem.data.category);

      // Add the highlight if necessary.
      if (taskItem.data.highlight) {
        taskItem.classList.add('highlight');
      }

      // Insert urgent tasks at the top and non urgent tasks at the bottom.
      var pendingList = document.querySelector('#pending-list');
      pendingList.insertBefore(taskItem, taskItem.data.urgent ? pendingList.firstChild : null);
    },

    // Modifies the inner data and current view of an existing task.
    update: function(taskItem, data) {
      if (data.title !== taskItem.data.title) {
        // Update title view.
        taskItem.querySelector('.center').innerHTML = data.title;
      }

      if (data.category !== taskItem.data.category) {
        // Modify the item before updating categories.
        taskItem.setAttribute('category', myApp.services.categories.parseId(data.category));
        // Check if it's necessary to create new categories.
        myApp.services.categories.updateAdd(data.category);
        // Check if it's necessary to remove empty categories.
        myApp.services.categories.updateRemove(taskItem.data.category);

      }

      // Add or remove the highlight.
      taskItem.classList[data.highlight ? 'add' : 'remove']('highlight');

      // Store the new data within the element.
      taskItem.data = data;
    },

    // Deletes a task item and its listeners.
    remove: function(taskItem) {
      taskItem.removeEventListener('change', taskItem.data.onCheckboxChange);

      myApp.services.animators.remove(taskItem, function() {
        // Remove the item before updating the categories.
        taskItem.remove();
        // Check if the category has no items and remove it in that case.
        myApp.services.categories.updateRemove(taskItem.data.category);
      });
    }
  },

  /////////////////////
  // Category Service //
  ////////////////////
  categories: {

    // Creates a new category and attaches it to the custom category list.
    create: function(categoryLabel) {
      var categoryId = myApp.services.categories.parseId(categoryLabel);

      // Category item template.
      var template = document.createElement('div');
      template.innerHTML =
        '<ons-list-item tappable category-id="' + categoryId + '">' +
          '<div class="left">' +
            '<ons-input type="radio" name="categoryGroup" input-id="radio-'  + categoryId + '"></ons-input>' +
          '</div>' +
          '<label class="center" for="radio-' + categoryId + '">' +
            (categoryLabel || 'No category') +
          '</label>' +
        '</ons-list-item>'
      ;

      // Takes the actual category item.
      var categoryItem = template.firstChild;

      // Adds filtering functionality to this category item.
      myApp.services.categories.bindOnCheckboxChange(categoryItem);

      // Attach the new category to the corresponding list.
      document.querySelector('#custom-category-list').appendChild(categoryItem);
    },

    // On task creation/update, updates the category list adding new categories if needed.
    updateAdd: function(categoryLabel) {
      var categoryId = myApp.services.categories.parseId(categoryLabel);
      var categoryItem = document.querySelector('#menuPage ons-list-item[category-id="' + categoryId + '"]');

      if (!categoryItem) {
        // If the category doesn't exist already, create it.
        myApp.services.categories.create(categoryLabel);
      }
    },

    // On task deletion/update, updates the category list removing categories without tasks if needed.
    updateRemove: function(categoryLabel) {
      var categoryId = myApp.services.categories.parseId(categoryLabel);
      var categoryItem = document.querySelector('#tabbarPage ons-list-item[category="' + categoryId + '"]');

      if (!categoryItem) {
        // If there are no tasks under this category, remove it.
        myApp.services.categories.remove(document.querySelector('#custom-category-list ons-list-item[category-id="' + categoryId + '"]'));
      }
    },

    // Deletes a category item and its listeners.
    remove: function(categoryItem) {
      if (categoryItem) {
        // Remove listeners and the item itself.
        categoryItem.removeEventListener('change', categoryItem.updateCategoryView);
        categoryItem.remove();
      }
    },

    // Adds filtering functionality to a category item.
    bindOnCheckboxChange: function(categoryItem) {
      var categoryId = categoryItem.getAttribute('category-id');
      var allItems = categoryId === null;

      categoryItem.updateCategoryView = function() {
        var query = '[category="' + (categoryId || '') + '"]';

        var taskItems = document.querySelectorAll('#tabbarPage ons-list-item');
        for (var i = 0; i < taskItems.length; i++) {
          taskItems[i].style.display = (allItems || taskItems[i].getAttribute('category') === categoryId) ? '' : 'none';
        }
      };

      categoryItem.addEventListener('change', categoryItem.updateCategoryView);
    },

    // Transforms a category name into a valid id.
    parseId: function(categoryLabel) {
      return categoryLabel ? categoryLabel.replace(/\s\s+/g, ' ').toLowerCase() : '';
    }
  },

  //////////////////////
  // Animation Service //
  /////////////////////
  animators: {

    // Swipe animation for task completion.
    swipe: function(listItem, callback) {
      var animation = (listItem.parentElement.id === 'pending-list') ? 'animation-swipe-right' : 'animation-swipe-left';
      listItem.classList.add('hide-children');
      listItem.classList.add(animation);

      setTimeout(function() {
        listItem.classList.remove(animation);
        listItem.classList.remove('hide-children');
        callback();
      }, 950);
    },

    // Remove animation for task deletion.
    remove: function(listItem, callback) {
      listItem.classList.add('animation-remove');
      listItem.classList.add('hide-children');

      setTimeout(function() {
        callback();
      }, 750);
    }
  }
};