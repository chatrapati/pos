myApp1.controller("headerController",function ($scope,$filter){
	
	
	  
	  var sessionFormat = "hh:mm:ss";
  
  $scope.sessionTime = new Date();
  
  $scope.loginSessionTime = $filter('date')($scope.sessionTime,sessionFormat);
  
  $scope.userName = window.localStorage['shopUsername'];
  

})