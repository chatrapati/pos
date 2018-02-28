

myApp1.controller('invoicePageController',['$scope','$filter','$rootScope','getInvoiceInfoService','transferOrderService',
function ($scope,$filter,$rootScope,getInvoiceInfoService,transferOrderService){
	

$rootScope.userName = window.localStorage['shopUsername'];
	
	$rootScope.shopName = window.localStorage['shopName'];
	
	$rootScope.loginSessionTime = window.localStorage['loginSessionTime'];
  
	$rootScope.createdDate = window.localStorage['createdDate'];
	
	$rootScope.shopAddress = window.localStorage['shopAddress'];
	
	$rootScope.showInvoicePrint = 'false';

	$scope.today = new Date();

	$scope.getInvoiceDetails = function(invoice){
		//alert(JSON.stringify(invoice))
		
		getInvoiceInfoService.getInvoiceInfo(invoice.invoiceId,window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password']).then(function(data){
			//alert(JSON.stringify(data))
			if(data.data.status == 'success'){
				$rootScope.showInvoicePrint = 'true';
				$rootScope.user_name = data.data.username;
				$rootScope.gstnum= data.data.GSTNUM;
				$rootScope.mobile=data.data.mobile;
				$rootScope.totalamount = data.data.total_amount;
				$rootScope.invoiceDetails = data.data.data;
				$rootScope.invoicenum = data.data.invoiceid;
			}else{
				alert(data.data.status)
			}
		})
	}

	$scope.printToCart = function(printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link href="bootstrap.min.css" rel="stylesheet"><style>@media print{#prnt_btn {display: none;  }}	</style></head><div onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
	
		}

		$scope.transferOrders = function(transferOrder){
			//alert(JSON.stringify(transferOrder))
			transferOrderService.transferOrderMethod(transferOrder.orderid,window.localStorage['shopName'],window.localStorage['userName'],window.localStorage['password']).then(function(data){
			//alert(JSON.stringify(data))
			if(data.data.status == 'order transfer successfully'){
				alert('Order transferred successfully to the Shop '+data.data.shop)
				location.reload();
			}else{
				alert(data.data.status)
			}
			})
		}

}])