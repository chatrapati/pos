	
			
	myApp1.service('customerPageService', function ($q, $http,SERVER_URL) {

		this.getCustomers = function (shopName,username,password,fromVal,toVal) {
			var deferred = $q.defer();

			$http({
				method: 'GET',
				url: SERVER_URL+'enduser?shop='+shopName+'&mobile=all&from='+fromVal+'&to='+toVal,
				headers: {'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}		
				
			}).then(function success(data) {
				deferred.resolve(data);

			}, function error(data) {
				deferred.reject(data);

			});

			return deferred.promise;
		};

	});		

myApp1.service('customerMobileNumService', function ($q, $http,SERVER_URL) {

		this.getCustomersByMobileNum = function (shopName,username,password,mobileNo) {
			var deferred = $q.defer();

			$http({
				method: 'GET',
				url: SERVER_URL+'enduser?shop='+shopName+'&mobile='+mobileNo,
				headers: {'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}		
				
			}).then(function success(data) {
				deferred.resolve(data);

			}, function error(data) {
				deferred.reject(data);

			});

			return deferred.promise;
		};

	});			
	