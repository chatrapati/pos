/*
myApp1.service('newCustomerService', function ($q,$http,SERVER_URL) {

		this.addCustomer = function (customerData,shopId,username,password) {
			var deferred = $q.defer();

			$http({
				alert(username);
			
				method: 'POST',
				url: SERVER_URL+'enduser?shop='+shopId,
				alert(url);
				headers: {'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),
				'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
				data:customerData				
			}).then(function success(data) {
				deferred.resolve(data);

			}, function error(data) {
				deferred.reject(data);

			});

			return deferred.promise;
		};

	});

*/

myApp1.service('newCustomerService', function ($q, $http,SERVER_URL) {

		this.addCustomer = function (customerData,username,password) {
			var deferred = $q.defer();
			//alert("Test123");
			$http({
				method: 'POST',
				/*url: SERVER_URL+'enduser?shop='+shopId,*/
				url:SERVER_URL+'enduser',
				headers: {'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type':'application/x-www-form-urlencoded;charset=utf-8'},
				/*headers: {'Content-Type':'application/json','Authorization':'Basic'+btoa(username+':'+password)},*/
				
				data:customerData				
			}).then(function success(data) {
				//alert(success)
				deferred.resolve(data);

			}, function error(data) {
				deferred.reject(data);

			});

			return deferred.promise;
		};

	});	
