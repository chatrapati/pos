myApp1.controller("ordersController", ['$scope', '$filter', 'orderService', function ($scope,$filter,orderService){
	
	orderService.then(function(res){
		$scope.users = res.data;
	});
	
	$scope.dltUser = function(delUserObj){
		$scope.delUserObj1 = delUserObj;	
	}
	
	/*for add and reduce quantity */
	/*$scope.ordersreduceQuantity = function(user){
		if(user.quantity > 1){
			user.quantity = user.quantity - 1;
		}
	}	
	$scope.ordersaddQuantity = function(user){
		user.quantity = user.quantity + 1;	
	}*/
		
	/*dynamically adding,update,edit,delete records to table*/
	$scope.newUser = {};
	$scope.clickedUser = {};
	$scope.message = false;
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

	/*Date method*/	
	var date_format = "dd/MM/yyyy hh:mm:ss";	
	$scope.current_date = new Date();	
	$scope.current_date_format = $filter('date')($scope.current_date,date_format);	
	/*date method ends*/
	
	/*dynamically adding,update,edit,delete records to table*/
	$scope.saveUser = function(){
		$scope.users.push($scope.newUser);
		$scope.newUser = {};
		$scope.message = "New User Added Successfully."
	};
	
	$scope.editUser = function(user){
		$scope.clickedUser = user;
	};
	
	$scope.updateUser = function(){
		$scope.message = "New User Updated Successfully."
	};
	
	$scope.deleteUser = function(){
		$scope.users.splice($scope.users.indexOf($scope.delUserObj1), 1);
		$scope.message = "New User Deleted Successfully."
	};
	
	/*$scope.viewDeatils = function(user){
		$scope.userDetails = user;
	}*/
	
	$scope.placeorderDeatils = function(user){
		$scope.userDetails = user;
	}
	
	$scope.clearMessage = function(){
		$scope.message = false;
	};
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