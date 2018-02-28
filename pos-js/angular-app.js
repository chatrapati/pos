var myApp1=angular.module('myApp', ['ngMessages','ngRoute']);

 myApp1.config(['$routeProvider','$locationProvider','$qProvider',
    function($routeProvider,$locationProvider, $qProvider) {
 $qProvider.errorOnUnhandledRejections(false);
			$routeProvider
			 .when('/pos-site-index', {
          templateUrl: '../pos-site-index.html',
          controller: 'posMainController'
        })
        .when('/posindex', {
          templateUrl: '../../pos-login-page.html',
          controller: 'loginController'
        })
       
        .otherwise({
          redirectTo: '/posindex'
        });
    }]);

/*myApp1.config(['$routeProvider','$locationProvider',
  function ($routeProvider,$locationProvider) {
    $routeProvider
	 .when('/', {
          templateUrl: '/pos-site-index.html',
          controller: 'posMainController'
        })
      .when('/pos-index', {
        templateUrl: 'pos-index.html'
      })
    
      
      .otherwise({
        redirectTo: '/pos-index'
      });
    }])*/

	/* for loading code strat here */
	myApp1.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
        link: function ($scope, element, attr) {
              $scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
	})
	/* for loading code end here */


	/*for convert to numbers to words code stsrat here */
	myApp1.filter('words', function() {
	  function isInteger(x) {
			return x % 1 === 0;
		}
	  return function(value) {
		if (value && isInteger(value))
		  return  convertNumberToWords(value);
		
		return value;
	  };
	});

	function convertNumberToWords(amount) {
		var words = new Array();
		words[0] = '';
		words[1] = 'One';
		words[2] = 'Two';
		words[3] = 'Three';
		words[4] = 'Four';
		words[5] = 'Five';
		words[6] = 'Six';
		words[7] = 'Seven';
		words[8] = 'Eight';
		words[9] = 'Nine';
		words[10] = 'Ten';
		words[11] = 'Eleven';
		words[12] = 'Twelve';
		words[13] = 'Thirteen';
		words[14] = 'Fourteen';
		words[15] = 'Fifteen';
		words[16] = 'Sixteen';
		words[17] = 'Seventeen';
		words[18] = 'Eighteen';
		words[19] = 'Nineteen';
		words[20] = 'Twenty';
		words[30] = 'Thirty';
		words[40] = 'Forty';
		words[50] = 'Fifty';
		words[60] = 'Sixty';
		words[70] = 'Seventy';
		words[80] = 'Eighty';
		words[90] = 'Ninety';
		amount = amount.toString();
		var atemp = amount.split(".");
		var number = atemp[0].split(",").join("");
		var n_length = number.length;
		var words_string = "";
		if (n_length <= 9) {
			var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
			var received_n_array = new Array();
			for (var i = 0; i < n_length; i++) {
				received_n_array[i] = number.substr(i, 1);
			}
			for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
				n_array[i] = received_n_array[j];
			}
			for (var i = 0, j = 1; i < 9; i++, j++) {
				if (i == 0 || i == 2 || i == 4 || i == 7) {
					if (n_array[i] == 1) {
						n_array[j] = 10 + parseInt(n_array[j]);
						n_array[i] = 0;
					}
				}
			}
			value = "";
			for (var i = 0; i < 9; i++) {
				if (i == 0 || i == 2 || i == 4 || i == 7) {
					value = n_array[i] * 10;
				} else {
					value = n_array[i];
				}
				if (value != 0) {
					words_string += words[value] + " ";
				}
				if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
					words_string += "Crores ";
				}
				if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
					words_string += "Lakhs ";
				}
				if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
					words_string += "Thousand ";
				}
				if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
					words_string += "Hundred and ";
				} else if (i == 6 && value != 0) {
					words_string += "Hundred ";
				}
			}
			words_string = words_string.split("  ").join(" ");
		}
		return words_string;
	}
	/* for convert to numbers to words code stsrat here */


myApp1.controller('initController',function($scope,loginService,$filter){
	
	$scope.userName = window.localStorage['shopUsername'];
	
	  
	  var sessionFormat = "hh:mm:ss";
  
  $scope.sessionTime = new Date();
  
  alert($scope.sessionTime);
  
  $scope.loginSessionTime = $filter('date')($scope.sessionTime,sessionFormat);
  alert($scope.loginSessionTime);
  
	  
  })
  
 

	



