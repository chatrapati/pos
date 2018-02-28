myApp1.controller('productController',['$scope','$rootScope','productService',function ($scope,$rootScope,productService){

	$rootScope.userName = window.localStorage['shopUsername'];
	
	$rootScope.shopName = window.localStorage['shopName'];
	
    $rootScope.loginSessionTime = window.localStorage['loginSessionTime'];
  
    $rootScope.createdDate = window.localStorage['createdDate'];
   
	$rootScope.currentPageNumber = 1;
	$scope.fromVal =0;
	$scope.toVal = 10;
	var currentPage = 0;
   
	$scope.getProducts = function(fromVal,toVal){
	
	productService.getProducts(window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password'],fromVal,toVal).then(function(res){
		//alert(JSON.stringify(res));
		if(res.data.status == 'success'){
			$rootScope.productsarray = res.data.products;
			$scope.serialNo = 1;
			$rootScope.productsarray.forEach(function(element) {
				element.S_no = $scope.serialNo;
				$scope.serialNo++
			}, this);
			$scope.fromVal = res.data.from;
			$scope.toVal = res.data.to;
			//alert($rootScope.productsNextBtn)
		}else{
			alert(res.data.status);
		}
		
	});
	}

	$rootScope.productsNextBtn = 'false';

	$scope.nextPageMethod = function(fromVal,toVal){
		//alert(fromVal)

		productService.getProducts(window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password'],JSON.parse(fromVal)+10,JSON.parse(toVal)+10).then(function(res){
		//alert(JSON.stringify(res));
	     if(res.data.status='success'){
			 if(res.data.products.length > 0){
				 $rootScope.productsNextBtn = 'true';
				  $rootScope.productsarray = res.data.products;
				
			
			$scope.fromVal = res.data.from;
			$scope.toVal = res.data.to;
			 $scope.serialNo = JSON.parse($scope.fromVal)+1;
			$rootScope.productsarray.forEach(function(element) {
				element.S_no = $scope.serialNo;
				$scope.serialNo++
			}, this);
			$rootScope.currentPageNumber = $rootScope.currentPageNumber+1;
			 }else{
				alert('No records available')
			 }
			//alert($scope.fromVal) 
		}else{
			alert(res.data.status);
		}
			
			
		});
		
		 
	}
	
	$scope.previousPageMethod = function(fromVal,toVal){
		//alert(fromVal)
		$rootScope.currentPageNumber = $rootScope.currentPageNumber-1;
		productService.getProducts(window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password'],JSON.parse(fromVal)-10,JSON.parse(toVal)-10).then(function(res){
		//alert(JSON.stringify(res));		
		if(res.data.status='success'){
			 $rootScope.productsNextBtn = 'false';
			  	$rootScope.productsarray = res.data.products;
			 
		
			$scope.fromVal = res.data.from;
			$scope.toVal = res.data.to;

			  $scope.serialNo = JSON.parse($scope.fromVal)+1;
			$rootScope.productsarray.forEach(function(element) {
				element.S_no = $scope.serialNo;
				$scope.serialNo++
			}, this);
		}else{
			alert(res.data.status);
		}
			
			
		});
	}

	$scope.logOut = function(){
	  $rootScope.userName ="";
	  $rootScope.shopName = "";
	  $window.localStorage.clear();
		$rootScope.loginSessionTime = "";
		$rootScope.createdDate ="";
		$rootScope.newCustomer = {};
		$rootScope.allBrandArray = [];
		$rootScope.allBrandCategoryArray =[];
		$rootScope.brandSubCategoryArray =[];
		$rootScope.subCategoryArray =[];
		$rootScope.brandsArray =[];
		$rootScope.productsArray =[];
		$rootScope.brandSubCatArray =[];
			}

	$scope.getProducts($scope.fromVal,$scope.toVal);
	/*dynamically adding,update,edit,delete records to table*/
	$scope.x="Table";
	/*dynamically adding,update,edit,delete records to table end*/
		
	/*pagination code*/
    $scope.currentPage = 0;
    $scope.pageSize = "10";
    $scope.data = [];
    //$scope.q = '';
	/*pagination code end*/
	
	/* sort rows by table header */
	$scope.sortColumn = "username";
	$scope.reverseSort = false;
	/* sort rows by table header end*/
	
	/*pagination code again start*/	
		/*pagination-search code start*/
			/*$scope.getData = function () {
			  return $filter('filter')($scope.data, $scope.q)
			}*/
		/*pagination-search code start*/
		
		$scope.numberOfPages=function(){
			return Math.ceil($scope.getData().length/$scope.pageSize);                
			}    
			for (var i=0; i<300; i++) {
			$scope.data.push("user "+i);
			}
	/*pagination code end*/
	
	/*dynamically adding,update,edit,delete records to table*/	
	$scope.viewDeatils = function(user){
		$scope.userDetails = user;
	}	
	/*dynamically adding,update,edit,delete records to table*/
	
	
	/* sort rows by table header */
	$scope.sortData = function(column){
		$scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
		$scope.sortColumn = column;
	}
	$scope.getSortClass = function(column){
		if ($scope.sortColumn == column) 
			return $scope.reverseSort ? 'arrow-down' : 'arroe-up'
		return '';
	}	
	/* sort rows by table header end*/
	
}]);