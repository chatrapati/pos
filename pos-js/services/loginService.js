myApp1.service('loginService', function ($q, $http,SERVER_URL) {

		this.getAddress = function (loginDetails) {
			var deferred = $q.defer();
            console.log(SERVER_URL);
			$http({
				method: 'POST',
				url: SERVER_URL+'login',
				headers: {'Content-Type': 'application/json','Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
				data:loginDetails
				
			}).then(function success(data) {
				deferred.resolve(data);

			}, function error(data) {
				deferred.reject(data);

			});

			return deferred.promise;
		};

	});	
	
	
	
	
	
