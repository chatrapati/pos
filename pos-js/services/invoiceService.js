myApp1.service('getInvoiceInfoService', function ($q, $http,SERVER_URL) {

    this.getInvoiceInfo = function (invoiceId,shop,username,password) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: SERVER_URL+'duplicateinvoice?invoiceid='+invoiceId+'&shop='+shop,
            headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('transferOrderService', function ($q, $http,SERVER_URL) {

    this.transferOrderMethod = function (orderId,shop,username,password) {

        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: SERVER_URL+'shopordertransfer?shop='+shop,
            headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data:{"orderid":orderId}
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	