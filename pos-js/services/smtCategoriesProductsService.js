	
myApp1.service('allCategoryService', function ($q, $http,SERVER_URL) {

    this.getAllCategories = function (shopId,username,password) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: SERVER_URL+'category?shop='+shopId+'&category=all',
            headers: { 'Content-Type': 'application/json' ,'Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('catBasedSubCatService', function ($q, $http,SERVER_URL) {

    this.getCatBasedSubCat = function (shopId,catName,username,password) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: SERVER_URL+'category?shop='+shopId+'&category='+catName+'&subcategory=',
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('subCatBasedBrandService', function ($q, $http,SERVER_URL) {

    this.getSubCatBasedBrand = function (shopId,catName,subCat,username,password) {

        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: SERVER_URL+'category?shop='+shopId+'&category='+catName+'&subcategory='+subCat,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' }
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('brandBasedProductsService', function ($q, $http,SERVER_URL) {

    this.getBrandBasedProducts = function (catName,subCat,brand,shopId,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'POST',
            url: SERVER_URL+'products?shop='+shopId,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password) ,'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			data:{"category":catName,"subcategory":subCat,"brand":brand}
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('mobileNoService', function ($q, $http,SERVER_URL) {

    this.getMobileno = function (shopId,mobileNo,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'GET',
            url: SERVER_URL+'mobilecheck?&mobile='+mobileNo+'&shop='+shopId,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
			
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('newOrderIdService', function ($q, $http,SERVER_URL) {

    this.getNewOrderId = function (shopId,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'GET',
            url: SERVER_URL+'neworder?shop='+shopId,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
			
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	


myApp1.service('orderSaveService', function ($q, $http,SERVER_URL) {

    this.saveOrders = function (orderArray,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'POST',
            url: SERVER_URL+'saveorder',
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			data:orderArray
						
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('generateInvoiceService', function ($q, $http,SERVER_URL) {

    this.generateInvoice = function (shopId,orderId,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'GET',
            url: SERVER_URL+'makeinvoice?shop='+shopId+'&orderid='+orderId,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
			
						
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('confirmInvoiceService', function ($q, $http,SERVER_URL) {

    this.confirmInvoice = function (shopId,confirmInvoiceArray,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'POST',
            url: SERVER_URL+'confirminv?shop='+shopId,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			data:confirmInvoiceArray
			
						
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	



myApp1.service('getOrderDetailsService', function ($q, $http,SERVER_URL) {

    this.orderDetailsByOrderId = function (shopId,orderId,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'GET',
            url: SERVER_URL+'orderinfo?shop='+shopId+'&orderid='+orderId,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
		
						
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});

myApp1.service('getAllBrandsService', function ($q, $http,SERVER_URL) {

    this.orderDetailsByOrderId = function (shopId,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'GET',
            url: SERVER_URL+'orderinfo?shop='+shopId,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
		
						
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});

myApp1.service('getSearchBrandsOrProductsService', function ($q, $http,SERVER_URL) {

    this.getSearchBrands = function (shopId,searchtext,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'GET',
            url: SERVER_URL+'search?shop='+shopId+'&serachtext='+searchtext,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password),'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
		
						
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});

/*------------------All service starts here -----------------------*/

myApp1.service('brandBasedAllProductsService', function ($q, $http,SERVER_URL) {

    this.getBrandBasedAllProducts = function (shopId,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'GET',
			//http://192.168.20.106:8090/api/v1/brands?brand=all&shop=Tools Hub@2020
			url: SERVER_URL+'brands?brand=all&shop='+shopId,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password) ,'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

/*------------------All service ends here -----------------------*/

myApp1.service('brandBasedAllCategoryService', function ($q, $http,SERVER_URL) {

    this.getBrandBasedAllcategory = function (brand,shopId,username,password) {

        var deferred = $q.defer();
		
        $http({
            method: 'GET',
			//http://192.168.20.106:8090/api/v1/brands?brand=all&shop=Tools Hub@2020
			url: SERVER_URL+'brands?brand='+brand+'&category=&shop='+shopId,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password) ,'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('productService', function ($q, $http,SERVER_URL) {

    this.getProducts = function (shopId,username,password,from,to) {

        var deferred = $q.defer();
		
        $http({
            method: 'GET',
		
			url: SERVER_URL+'shopproducts?shop='+shopId+'&from='+from+'&to='+to,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password) ,'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			
           
			
        }).then(function success(data) {
            deferred.resolve(data);
        }, function error(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    };	
});	

myApp1.service('getBarcodeBasedProductService', function ($q, $http,SERVER_URL){
  this.getBarcodeBasedProductMethod = function (shop,barcode,username,password) {

        var deferred = $q.defer();
        serviceURL = SERVER_URL+'barcode?shop='+shop+'&barcode='+barcode;
        console.log(serviceURL);
       
        $http({
            method: 'GET',
            url: serviceURL,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password) ,'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
          
        }).then(function (data) {
            deferred.resolve(data);
        }, function (data) {
            deferred.reject(data);

        });
        return deferred.promise;
    };
});

myApp1.service('showLastReceiptService', function ($q, $http,SERVER_URL){
  this.showLastReceiptMethod = function (shop,username,password) {

        var deferred = $q.defer();
        serviceURL = SERVER_URL+'latestorder?shop='+shop;
        console.log(serviceURL);
       
        $http({
            method: 'GET',
            url: serviceURL,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password) ,'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
          
        }).then(function (data) {
            deferred.resolve(data);
        }, function (data) {
            deferred.reject(data);

        });
        return deferred.promise;
    };
});

myApp1.service('cancelInvoiceService', function ($q, $http,SERVER_URL){
  this.cancelInvoiceMethod = function (orderId,username,password) {

        var deferred = $q.defer();
        serviceURL = SERVER_URL+'cancelinvoice';
        console.log(serviceURL);
       
        $http({
            method: 'POST',
            url: serviceURL,
            headers: { 'Content-Type': 'application/json','Authorization':'Basic '+btoa(username+':'+password) ,'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
            data: {"orderid":orderId}
        }).then(function (data) {
            deferred.resolve(data);
        }, function (data) {
            deferred.reject(data);

        });
        return deferred.promise;
    };
});