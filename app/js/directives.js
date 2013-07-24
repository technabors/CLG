
App.controller('actionsCtrl', function($scope, Catalogue, $dialog) {
	$scope.catalogue = Catalogue;

})
App.controller('dialogCtrl', function($scope, Catalogue, dialog){
	$scope.catalogue = Catalogue;
	$scope.close = function(result){
		dialog.close();
	}
})
App.directive('indexActions', function(Catalogue, $q, $http, $rootScope, $compile, $dialog){
	return {
		restrict:"A",
		scope: {
			type:'@',
			edit:"=",
			location:"=",
			target:"=",
		},
		controller:'actionsCtrl',

		link: function(scope, element, attrs){
			scope.addGroupTo = function() {
				if(scope.type == 'paste') {
					scope.location.push(Catalogue.copy);
				} else {
					scope.location.push(Catalogue.structure[scope.type]);
				}
				Catalogue.saveGuide();

				//TODO DELETE GUIDE!

			}
			scope.removeFromGroup = function() {
				scope.location.splice(scope.target, 1);
				Catalogue.saveGuide();
			}
			scope.addNewPage = function() {
				$http.get('app/api/index.php', {
					params:{
						collection:'content',
						action:'addPage',
						json:angular.toJson(Catalogue.structure.page)
					}
				}).success(function(data){
					data.id = data._id.$id;
					data.type = 'page';
					Catalogue.pages[data.id] = data;
					scope.location.push(Catalogue.pages[data.id]);
					Catalogue.saveGuide();				
				});			
			}
			scope.copy = function() {
				Catalogue.copy = angular.copy(scope.target);
				console.log(Catalogue.copy)
			}



			scope.opts = {
				backdrop: true,
				keyboard: true,
				backdropClick: true,
			    templateUrl:'app/view/templates/directives/modals/page-modal.html', // OR: templateUrl: 'path/to/view.html',
			    controller: 'dialogCtrl'
			};
			scope.openDialog = function(type){
				scope.opts.templateUrl = 'app/view/templates/directives/modals/'+type+'-modal.html'
				var d = $dialog.dialog(scope.opts);
				d.open().then(function(result){
					console.log(scope)
					console.log(result)
					if(result)
					{
						alert('dialog closed with result: ' + result);
					}
				});
			};			
			scope.openMessageBox = function(){
				var title = 'This is a message box';
				var msg = '';
				var btns = [{result:'cancel', label: 'Cancel'}, {result:'ok', label: 'OK', cssClass: 'btn-primary'}];

				$dialog.messageBox(title, msg, btns)
				.open()
				.then(function(result){
					alert('dialog closed with result: ' + result);
				});
			};
			

		}
	}
})

App.directive('editItem', function(Catalogue, $rootScope){
	return {
		scope: {
			item:'='
		},
		transclude:true,
		template:'<span ng-transclude></span>',
		link: function(scope, element, attrs){
			element.bind('click', function(){
				Catalogue.saveGuide();
				Catalogue.savePage();
				Catalogue.edit = scope.item;
				$rootScope.$broadcast('editItem');
			});
		}
	}
});





