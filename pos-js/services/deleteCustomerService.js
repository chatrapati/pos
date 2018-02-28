myApp1.service('deleteCustomerService', function ($q, $http) {

		this.deleteCustomer = function (mobileno,shopId,username,password) {
			var deferred = $q.defer();

			$http({
				method: 'DELETE',
				url: 'http://192.168.20.62:8000/api/v1/enduser?shop='+shopId+'&mobile='+mobileno,
				headers: {'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
							
			}).then(function success(data) {
				deferred.resolve(data);

			}, function error(data) {
				deferred.reject(data);

			});

			return deferred.promise;
		};

	});	