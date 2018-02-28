myApp1.controller('customerPageController',['$scope','$filter','customerPageService','customerMobileNumService','newCustomerService','editCustomerService','deleteCustomerService','$rootScope',
function ($scope,$filter,customerPageService,customerMobileNumService,newCustomerService,editCustomerService,deleteCustomerService,$rootScope){
	$rootScope.userName = window.localStorage['shopUsername'];
	
	$rootScope.shopName = window.localStorage['shopName'];
	
	$rootScope.loginSessionTime = window.localStorage['loginSessionTime'];
  
    $rootScope.createdDate = window.localStorage['createdDate'];

  
	 $rootScope.currentPageNumber = 1;
	$scope.fromVal =0;
	$scope.toVal = 10;
	var currentPage = 0;
	
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

	$scope.getCustomersMethod = function(fromVal,toVal){
		
		customerPageService.getCustomers(window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password'],fromVal,toVal).then(function(res){
		//alert(JSON.stringify(res));
		
		if(res.data.status=='success'){
			
			$rootScope.customerList=res.data.data;
			$scope.fromVal = res.data.from;
			$scope.toVal = res.data.to;
			//$scope.customersCount = res.data.customers_count;

			$scope.serialNo = 1;
			$rootScope.customerList.forEach(function(element) {
				element.S_no = $scope.serialNo;
				$scope.serialNo++
			}, this);
						
		}else{
			
			alert(res.data.status);
		}
			
			
			
		});
	}
	
	$scope.getCustomersMethod($scope.fromVal,$scope.toVal);

	$rootScope.customerNextBtn = 'false';
	
	$scope.nextPageMethod = function(fromVal,toVal){
		//alert(fromVal)
		
		customerPageService.getCustomers(window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password'],JSON.parse(fromVal)+10,JSON.parse(toVal)+10).then(function(res){
		//alert(JSON.stringify(res));
	     if(res.data.status='success'){
			 if(res.data.data.length > 0){
			$rootScope.customerList=res.data.data;
			$rootScope.customerNextBtn = 'true';
			$scope.fromVal = res.data.from;
			$scope.toVal = res.data.to;
			$rootScope.currentPageNumber = $rootScope.currentPageNumber+1;
			$scope.serialNo = JSON.parse($scope.fromVal)+1;;
			$rootScope.customerList.forEach(function(element) {
				element.S_no = $scope.serialNo;
				$scope.serialNo++
			}, this);
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
		customerPageService.getCustomers(window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password'],JSON.parse(fromVal)-10,JSON.parse(toVal)-10).then(function(res){
		//alert(JSON.stringify(res));
		
		
		if(res.data.status='success'){
			$rootScope.customerNextBtn = 'false';
			$rootScope.customerList=res.data.data;
			$scope.fromVal = res.data.from;
			$scope.toVal = res.data.to;
				$scope.serialNo = JSON.parse($scope.fromVal)+1;;
			$rootScope.customerList.forEach(function(element) {
				element.S_no = $scope.serialNo;
				$scope.serialNo++
				}, this);
		}else{
			alert(res.data.status);
		}
			
			
		});
	}
	
	$scope.newCustomerObj = [];
	$rootScope.newCustomer = {"createddate":$rootScope.createdDate,"createdat":window.localStorage['shopName'],"rewardpoints":""};
	
	$scope.resetForm = function(){
		//alert('1')
		
		 $scope.addCustomerForm.$setPristine();
		 $scope.addCustomerForm.$setUntouched();
		 $scope.submitted = false;
		  $rootScope.newCustomer ={};
		$rootScope.newCustomer = {"createddate":$rootScope.createdDate,"createdat":window.localStorage['shopName'],"rewardpoints":""};
	
		 }
	
	$scope.saveNewCustomer = function(newCustomer){
		var newCustomerArray = {"shop":window.localStorage['shopName'],"firstname":newCustomer.firstname,"lastname":newCustomer.lastname,
		"mobile":"91"+newCustomer.mobile,"altmobile":"91"+newCustomer.altmobile,"email":newCustomer.email,
		"rewardpoints":"0","discount":newCustomer.discount,"createddate":newCustomer.createddate,"createdat":newCustomer.createdat};
		//alert(JSON.stringify(newCustomer))
		newCustomerService.addCustomer(newCustomerArray,window.localStorage['userName'],window.localStorage['password']).then(function(res){
			//alert(JSON.stringify(res));	
			
			if(res.data.status == 'Data saved successfully'){
			$rootScope.newCustomer ={};
					 $rootScope.newCustomer = {"createddate":$rootScope.createdDate,"createdat":window.localStorage['shopName']};
			$rootScope.submitted = 'false';
			$('#AddCustomer').modal('hide');
				alert('Customer Added Successfully');
				$scope.getCustomersMethod($scope.fromVal,$scope.toVal);
				
			}else{
				alert(res.data.status);
			}
			
		});
		
	}

	$scope.closeEditCustModal = function(){
		$scope.getCustomersMethod($scope.fromVal,$scope.toVal);
	}
	
	$scope.searchByMobile = function(searchMobileNum){
	if(searchMobileNum.length == 10){
	customerMobileNumService.getCustomersByMobileNum(window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password'],searchMobileNum).then(function(data){
		//alert(JSON.stringify(data));
		if(data.data.status == 'success'){
			$scope.customerList=data.data.data;
		}else{
			alert(data.data.status);
		}
	})
	}

	
	}
	
	
	
	$scope.updateUser = function(newCustomer){
		//alert(JSON.stringify(newCustomer));
		
		var updateCustomerArray = {};
		updateCustomerArray.shop = window.localStorage['shopName'];
		updateCustomerArray.firstname = newCustomer.firstName;
		updateCustomerArray.lastname = newCustomer.lastName;
		updateCustomerArray.mobile = newCustomer.mobileNo;
		updateCustomerArray.altmobile =newCustomer.altmobileNo;
		updateCustomerArray.email = newCustomer.emailId;
		updateCustomerArray.rewardpoints = newCustomer.rewardpoints;
		updateCustomerArray.discount = newCustomer.discount;
		updateCustomerArray.createddate = newCustomer.createddate;
		updateCustomerArray.createdat = newCustomer.createdat;
		updateCustomerArray.address = "";
		updateCustomerArray.id = newCustomer.id;
		//alert(JSON.stringify(updateCustomerArray))
		
		editCustomerService.editCustomer(updateCustomerArray,window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password']).then(function(res){
			//alert(JSON.stringify(res))
			if(res.data.status == 'Details Updated Successfully'){
				$('#pplcustmrEditModal').modal('hide');
				alert('Details updated Successfully');
				$scope.getCustomersMethod($scope.fromVal,$scope.toVal);
			}else{
				alert(res.data.status);
			}
		});
	}
	
	/*$scope.dltUser = function(mobileno){
		alert(mobileno);
		$scope.mobileNo = mobileno;
	}*/
	
	$scope.deleteUser = function(mobileno){
		
		deleteCustomerService.deleteCustomer(mobileno,window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password']).then(function(res){	
			alert(JSON.stringify(res));		
		});
			
	}
	
	
	/*dynamically adding,update,edit,delete records to table*/
	$scope.x="Table";
	/*dynamically adding,update,edit,delete records to table end*/

	/*dynamically adding,update,edit,delete records to table*/
	$scope.newUser = {};
	$scope.clickedUser = {};
	$scope.message = false;
	$scope.x="Table";
	/*dynamically adding,update,edit,delete records to table end*/
		
	/*pagination code*/
   
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

	/*pagination-search code start*/	
    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);                
		}    
		for (var i=0; i<300; i++) {
        $scope.data.push("user "+i);
		}
	/*pagination code end*/
	
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

	/*dynamically adding,update,edit,delete records to table*/
	$scope.saveUser = function(){
		$scope.customer.push($scope.newUser);
		$scope.newUser = {};
		$scope.message = "New User Added Successfully."
	};
	
	$scope.editUser = function(user){
		//alert(user);
		$scope.clickedUser = user;
		var updateCustomerArray = {};
		updateCustomerArray.shop = window.localStorage['shopName'];
		updateCustomerArray.firstName = $scope.clickedUser.firstname;
		updateCustomerArray.lastName = $scope.clickedUser.lastname;
		updateCustomerArray.mobileNo = $scope.clickedUser.mobile;
		updateCustomerArray.altmobileNo =$scope.clickedUser.altmobile;
		updateCustomerArray.emailId = $scope.clickedUser.email;
		updateCustomerArray.rewardpoints = $scope.clickedUser.rewardpoints;
		updateCustomerArray.discount = $scope.clickedUser.discount;
		updateCustomerArray.createddate = $scope.clickedUser.createddate;
		updateCustomerArray.createdat = $scope.clickedUser.createdat;
		updateCustomerArray.address = "";
		updateCustomerArray.id = $scope.clickedUser.id;
		$scope.updateCustomerArray = updateCustomerArray;
	};
	
	/*$scope.updateUser = function(){
		$scope.message = "User Updated Successfully."
	};*/
	
	$scope.clearMessage = function(){
		$scope.message = false;
	};
	/*dynamically adding,update,edit,delete records to table*/
	


}]);