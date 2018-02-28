myApp1.controller("smtCategoryPrductController",function ($scope,smtCategoryPrductService){

	var catProductsArray=[]
	
	$scope.smtCategory = function(value){
		$scope.loading = true;
		smtCategoryPrductService.smtCategoryPrductData(value).then(function(data){
		alert(JSON.stringify(data))
		if (data.data.status == 'success') {
              if (data.data.data == null) {
               
                $scope.catProductsArray = [];
              } else {
                catProductsArray = data.data.data;
                $scope.catProductsArray = catProductsArray;
              }
				$scope.loading = false;
            } 
            else {
              alert("no data")
            }
		});		
	}
});