

App.controller('GuidesController', function($scope, $rootScope, $routeParams, $location, $http, GuideModel, PageModel, SharedServices) {
	$rootScope.guides = {};
	
	$scope.editorContent = {};

	$scope.showEditor = false;


	$http.get('app/api/get-guides.php').success(function(data){
		$rootScope.guides = data;

		SharedServices.setGuide($rootScope.guides[$routeParams.guideIndex]);

	});

	//SET THE LOCAL GUIDE
	$scope.$on('guideSet', function(){
		$scope.guide = SharedServices.guide();

	});

	
	// var guide = SharedServices.guide();

	// $scope.$on('saveGuide', function(){
	// 	GuideModel.saveGuide(this.guide);
	// });


	$scope.edit = function(item, type) {
		SharedServices.linkItem(item);
			$scope.showEditor = true;

		//$scope.editorContent = SharedServices.linkedItem();

		// if(type == 'page') {		
		// 	$scope.editorType = 'page';
		// } else {
		// 	$scope.editorType = null;
		// }
	}

	$scope.addGuide = function() {
		var newguide = {
			title:'new guide',
			books:[]
		}
		GuideModel.saveGuide(newguide);

		var index = $rootScope.guides.length;

		$location.path('/'+index);


	}


	//+-----------------------------------------------------
	//BOOK
	//+-----------------------------------------------------
	
	// $scope.addBook = function() {
	// 	$scope.form.chapters = [];
		
	// 	//ADD A BOOK
	// 	this.guide.books.push($scope.form);
		
	// 	//SAVE THE GUIDE
	// 	GuideModel.saveGuide(this.guide);

	// 	$scope.bookForm = {};
	// }	
	$scope.deleteBook = function(index) {
		var guide = this.guide;

		//DELETE BOOK FROM GUIDE
		guide.books.splice(index, 1);

		//SAVE THE GUIDE
		GuideModel.saveGuide(guide);		
	}


	//+-----------------------------------------------------
	//CHPATER
	//+-----------------------------------------------------
	
	// $scope.addChapter = function(index) {
	// 	var guide = this.guide;
		
	// 	var chapter = {
	// 		title:'new chapter',
	// 		pages:[]
	// 	}

	// 	//ADD A CHAPTER
	// 	guide.books[index].chapters.push(chapter);

	// 	//SAVE THE GUIDE
	// 	GuideModel.saveGuide(guide);


	// }	
	$scope.deleteChapter = function(index, parentIndex) {
		var guide = this.guide;

		//DELETE BOOK FROM GUIDE
		guide.books[parentIndex].chapters.splice(index, 1);

		//SAVE THE GUIDE
		GuideModel.saveGuide(guide);		
	}

	$scope.copyChapter = function(bookIndex, chapterIndex) {
		SharedServices.copyItem(this.guide.books[bookIndex].chapters[chapterIndex]);
	}
	$scope.pasteChapter = function(bookIndex) {
		var guide = this.guide;

		guide.books[bookIndex].chapters.push(SharedServices.copiedItem());


		GuideModel.saveGuide(guide);
	}	

	//+-----------------------------------------------------
	//CHPATER
	//+-----------------------------------------------------
	
	// $scope.addPage = function(chpaterIndex, bookIndex) {
	// 	var guide = this.guide;
		
	// 	var page = {
	// 		title:'new page'
	// 	}


	// 	PageModel.createNewPage(page).success(function(data){
	// 		guide.books[bookIndex].chapters[chpaterIndex].pages.push({id:data.$id.$id, type:'page'});

	// 		//SAVE THE GUIDE
	// 		GuideModel.saveGuide(guide);
					

	// 	});

	// }	

	$scope.deletePageRef = function(bookIndex, chapterIndex, pageIndex) {
		var guide = this.guide;

		//DELETE BOOK FROM GUIDE
		guide.books[bookIndex].chapters[chapterIndex].pages.splice(pageIndex, 1);

		//SAVE THE GUIDE
		GuideModel.saveGuide(guide);	
	}



});





App.controller('PageController', function($scope, $rootScope, $routeParams, $location, $http, Utils, SharedServices, GuideModel) {
	var ref = {
		ref:'content',
		id: $scope.page.id
	}             

	$http.get('app/api/get-page.php', {params:ref}).success(function(data){
		$scope.page = data;
		//$scope.page.content = Utils.makeMarkdown($scope.page.content);
	});
	
	var guide = SharedServices.guide();

	$scope.pageUp = function(bookIndex, chapterIndex) {
		var guide = this.guide;

		var parent = guide.books[bookIndex].chapters[chapterIndex].pages;

		var index = $scope.$index;
		var newPos = index-1;

		parent.splice(newPos, 0, parent.splice(index, 1)[0]);

		GuideModel.saveGuide(this.guide);

	}
	$scope.pageDown = function(bookIndex, chapterIndex) {
		var guide = this.guide;

		var parent = guide.books[bookIndex].chapters[chapterIndex].pages;

		var index = $scope.$index;
		var newPos = index+1;

		parent.splice(newPos, 0, parent.splice(index, 1)[0]);

		GuideModel.saveGuide(this.guide);

	}

});


App.controller('ContentController', function($scope, $rootScope, $routeParams, $location, $http, Utils, SharedServices, GuideModel){
		$http.get('app/api/get-content.php', {}).success(function(data){
			$scope.contents = data;
			//$scope.page.content = Utils.makeMarkdown($scope.page.content);

			angular.forEach($scope.contents, function(content) {
				content.versions = [];
				$http.get('app/api/get-content.php', {params:{versionedFrom:content._id.$id}}).success(function(data){
					content.versions.push(data);
				});
			});
		});
});



