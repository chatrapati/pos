/* LOADING BUTTON CODE START HERE */
myApp1 .controller('lodingController', ['$scope', function($scope){
        $scope.done = '';
    }])
    .directive('loadingBtn', ['$timeout', function($timeout){
        return {
            link: function(scope, element, attrs){
                element.bind('click', function(){
                  
                  if(scope.loading == true || scope.done == 'done') {
                    return;
                  }
                  
                  scope.loading = true;
                  
                  element.addClass('loading');
                  
                  timeoutId = $timeout(function() {
                    scope.loading = false;
                    element.removeClass('loading');
                    scope.done = 'done';
                  }, 2000); 
                });
                 
            }
        };
    }]);
/* LOADING BUTTON CODE END HERE */