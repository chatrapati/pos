myApp1.service('editCustomerService', function ($q, $http,SERVER_URL) {

		this.editCustomer = function (customerData,shopId,username,password) {
			var deferred = $q.defer();

			$http({
				method: 'PUT',
				url: SERVER_URL+'enduser?shop='+shopId,
				headers: {'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
				data:customerData				
			}).then(function success(data) {
				deferred.resolve(data);

			}, function error(data) {
				deferred.reject(data);

			});

			return deferred.promise;
		};

	});	