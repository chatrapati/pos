myApp1.service('getItemInfoService', function ($q, $http,SERVER_URL) {

    this.getItemInfo = function (itemId,shopId,username,password) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: SERVER_URL+'iteminfo?shop='+shopId+'&smtid='+itemId,
            headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('getServiceTaxService', function ($q, $http,SERVER_URL) {

    this.getServiceTax = function (username,password) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: SERVER_URL+'servicetax',
            headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('sendServiceDetailService', function ($q, $http,SERVER_URL) {

    this.serviceDetails = function (serviceInfo,userInfo,shopId,username,password) {

        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: SERVER_URL+'serviceinfo?shop='+shopId,
            headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			data:{"serviceinf":serviceInfo,"user":userInfo}
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('getServiceDetailService', function ($q, $http,SERVER_URL) {

    this.getServiceDetails = function (serviceId,username,password) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: SERVER_URL+'serviceinfo?service_id='+serviceId,
            headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
			
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('generateServiceInvoiceService', function ($q, $http,SERVER_URL) {

    this.generateInvoice = function (serviceId,username,password,shop) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: SERVER_URL+'serviceinvoice?service_id='+serviceId+'&shop='+shop,
            headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
			
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});

myApp1.service('exchangeProductService', function ($q, $http,SERVER_URL) {

    this.exchangeProduct = function (exchangeData,username,password) {

        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: SERVER_URL+'exchange',
            headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			data:exchangeData
			
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});

myApp1.service('dealerLoginService', function ($q, $http,SERVER_URL) {

    this.dealerAuthentication = function (dealerLoginData,username,password) {

        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: SERVER_URL+'dealerlogin?usertype=Distributor/Dealer',
            headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			data:dealerLoginData
			
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});




	