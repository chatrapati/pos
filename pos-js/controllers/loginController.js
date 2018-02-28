	myApp1.controller("loginController",function ($scope, $location,$window,loginService,$filter){

		$scope.login = function(loginData){	
		//alert(JSON.stringify(loginData));
		
		var sessionFormat = "hh:mm:ss";
  
        $scope.sessionTime = new Date();
  
 
        var dateFormat = "yyyy/MM/dd";
  
        window.localStorage['loginSessionTime'] = $filter('date')($scope.sessionTime,sessionFormat);
  
        window.localStorage['createdDate'] = $filter('date')($scope.sessionTime,dateFormat);
  
		window.localStorage['userName'] = loginData.username;
		window.localStorage['password'] = loginData.password;
				loginService.getAddress(loginData).then(function(res){
					//alert(JSON.stringify(res));
					if(res.data.status == 'Success'){
					window.localStorage['shopName'] = res.data.shop;
					window.localStorage['shopUsername'] = res.data.username;
					window.localStorage['shopAddress'] = res.data.shop_address;
					//window.localStorage['shopId'] = res.data.shopid;
					window.location.href = "./pos-site-index.html";
					/*$location.path('/pos-site-index')*/
					}else if(res.data.status == 'Not a user'){
						alert('Incorrect user name or password')
					}else{
					alert('Incorrect user name or password');
					}
											    
				})										
		}
	});

