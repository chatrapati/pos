myApp1.controller('servicesCtrl', function ($scope, $rootScope, getItemInfoService, exchangeProductService, generateServiceInvoiceService, getServiceDetailService, $filter, getServiceTaxService, sendServiceDetailService, dealerLoginService) {

	$rootScope.userName = window.localStorage['shopUsername'];

	$rootScope.shopName = window.localStorage['shopName'];

	$rootScope.loginSessionTime = window.localStorage['loginSessionTime'];

	$rootScope.shopAddress = window.localStorage['shopAddress'];

	$rootScope.getSMTidBtn = 'true';

	$scope.getItemDetails = function (serviceitem) {
		//alert('2')
		if (serviceitem == undefined) {
			alert('Enter SMT Id')
		} else {
			var dateFormat = "yyyy/MM/dd";
			getItemInfoService.getItemInfo(serviceitem.itemId, window.localStorage['shopName'], window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data));
				if (data.data.status == 'success') {
					$rootScope.serviceItemDetails = data.data.data;
					$rootScope.getSMTidBtn = 'false';
					if ($rootScope.serviceItemDetails.warranty == 0) {
						$scope.showNoWarranty = 'true';
					} else {
						$scope.mydate = new Date($rootScope.serviceItemDetails.purchased_date);

						$scope.warrantyDate = $scope.mydate.setMonth($scope.mydate.getDate() + JSON.parse($rootScope.serviceItemDetails.warranty));
						$scope.warrantyDate = $filter('date')($scope.warrantyDate, dateFormat);

						if ($scope.warrantyDate > window.localStorage['createdDate']) {
							$scope.showWarranty = 'true';
						}
						else {
							$scope.showWarranty = 'false';
						}
					}
				} else {
					alert(data.data.status);
				}
			})
		}
	}

	$scope.getServiceTax = function () {
		getServiceTaxService.getServiceTax(window.localStorage['userName'], window.localStorage['password']).then(function (data) {
			//alert(JSON.stringify(data))
			if (data.data.status = 'success') {
				$rootScope.taxArray = data.data.tax;
			} else {
				alert(data.data.status);
			}
		})
	}
	$scope.getServiceTax();

	$rootScope.serviceInfoArray = [];

	$scope.addServiceDetails = function (service) {
		//alert('1')

		
		if (service == undefined) {
				alert('Select all fields')
		}
			else if (service.item_name == undefined || service.charges == undefined || service.tax == undefined || service.applicable == undefined) {
				alert('Select all fields')
			}
		 else {
			$rootScope.serviceInfoArray.push(service);
				$scope.service = {};
				$scope.submitted = 'false';
				$scope.serviceDetailsForm.$setPristine();
				$scope.serviceDetailsForm.$setUntouched();
				$rootScope.totalAmnt = 0;
				$scope.totalCal();
		}


	}

	$scope.total_tax_change = function (serviceInfo) {

		$scope.total = serviceInfo.tax;
		var taxVal = Math.round($scope.total * serviceInfo.charges / 100);
		$scope.taxVal = taxVal;
		//alert($scope.taxVal);
		return JSON.parse(serviceInfo.charges) + JSON.parse($scope.taxVal);
	}

	$rootScope.hideErrorMsgs = 'false';
	$scope.serviceOrderIdGenerate = function () {
		//alert(JSON.stringify($rootScope.serviceInfoArray))
		$rootScope.serviceInfoArray.forEach(function (serviceObj) {

			if (serviceObj.applicable == 'yes') {

				serviceObj.total = JSON.stringify($scope.total_tax_change(serviceObj));
			} else {

				serviceObj.total = "0";
			}
		})
		$scope.user = [];
		if ($rootScope.serviceInfoArray.length == 0) {
			alert('Add services details')
		} else {
			$rootScope.printService = 'false';

			$scope.user.push($rootScope.serviceItemDetails);

			sendServiceDetailService.serviceDetails($rootScope.serviceInfoArray, $scope.user, window.localStorage['shopName'], window.localStorage['userName'], window.localStorage['password']).then(function (data) {

				if (data.data.status == 'success') {
					$rootScope.serviceOrderId = data.data.service_id;
					alert('Service order requested successfully. Your service order Id :' + JSON.stringify($rootScope.serviceOrderId))
					$rootScope.showOrderPrintBtn = 'true';
					$rootScope.hideErrorMsgs = 'true';
				} else {
					alert(data.data.message);
				}
			})
		}


	}
	$scope.showPrintBtn = 'false';

	$scope.getServiceOrderInfo = function (serviceOrder) {

		if (serviceOrder == undefined) {
			alert('Please enter Service Order ID')
		} else {
			getServiceDetailService.getServiceDetails(serviceOrder, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data))
				if (data.data.status == 'success') {
					$rootScope.serviceOrderInfo = data.data.data;
					data.data.userinfo.forEach(function (userData) {
						$rootScope.serviceOrderUserInfo = userData;
						$rootScope.invoiceAmnt = 0;
						$scope.invoiceTotal();
					})

					$rootScope.serviceId = data.data.service_id;
				} else {
					alert(data.data.status);
				}
			})
		}
	}


	$scope.generateServiceInvoice = function () {
		generateServiceInvoiceService.generateInvoice($rootScope.serviceId, window.localStorage['userName'], window.localStorage['password'], window.localStorage['shopName']).then(function (data) {
			//alert(JSON.stringify(data));
			if (data.data.status == 'success') {
				$scope.showPrintBtn = 'true';
				$rootScope.invoiceId = data.data.invoice_id;
				alert('Invoice generated successfully for Id:' + $rootScope.invoiceId);


			} else {
				alert(data.data.status);
			}
		})
	}
	$rootScope.showOrderPrintBtn = 'false';

	$rootScope.printsection = 'false';

	$scope.exchangeProduct = function (exchange) {

		//exchangeObj.shop = window.localStorage['shopName'];
		$rootScope.exchangeObjArray = { "shop": window.localStorage['shopName'], "orderid": exchange.orderid,
		 "brand": exchange.brand, "old_smt_id": exchange.old_smt_id, "model": exchange.modelno,
		   "new_smt_id": exchange.avlsmtids, "productdesp": exchange.productdesp,"mobile":$rootScope.exchangeDetails.user_mobile }
	//alert(JSON.stringify(exchangeObjArray))
		exchangeProductService.exchangeProduct($rootScope.exchangeObjArray, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
			//alert(JSON.stringify(data))
			if (data.data.status == 'success') {
				alert('Replacement successful');
				$rootScope.submitted = 'false';
				//location.reload();
				$scope.exchange = {};
				$scope.exchangeDataForm.$setPristine();
				$scope.exchangeDataForm.$setUntouched();
			} else {
				alert(data.data.status)
			}
		})
	}
$scope.today = new Date();
	$scope.totalCal = function () {

		angular.forEach($rootScope.serviceInfoArray, function (serviceInfo) {

			if (serviceInfo.applicable == 'yes') {
				$rootScope.totalAmnt += $scope.total_tax_change(serviceInfo);
				//console.log($rootScope.totalAmnt);
			}
		})

		return $rootScope.totalAmnt
	}

		$scope.printExchange = function (printSectionId) {
			$rootScope.printsection = 'true';
		var innerContents = document.getElementById("printSectionId").innerHTML;
		var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
		popupWinindow.document.open();
		popupWinindow.document.write('<html><head><link href="bootstrap.min.css" rel="stylesheet"></head><div onload="window.print()">' + innerContents + '</html>');
		popupWinindow.document.close();

	}

	$scope.printServiceOrder = function (printSectionId1) {
		var innerContents = document.getElementById("printSectionId1").innerHTML;
		var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
		popupWinindow.document.open();
		popupWinindow.document.write('<html><head><link href="bootstrap.min.css" rel="stylesheet"></head><div onload="window.print()">' + innerContents + '</html>');
		popupWinindow.document.close();

	}

	$scope.printInvoice = function (printSectionId) {
		var innerContents = document.getElementById("printSectionId").innerHTML;
		var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
		popupWinindow.document.open();
		popupWinindow.document.write('<html><head><link href="bootstrap.min.css" rel="stylesheet"></head><div onload="window.print()">' + innerContents + '</html>');
		popupWinindow.document.close();
	}



	$scope.invoiceTotal = function () {
		angular.forEach($rootScope.serviceOrderInfo, function (serviceInfo) {

			if (serviceInfo.applicable == 'yes') {
				$rootScope.invoiceAmnt += JSON.parse(serviceInfo.total);
			}
		})

		return $rootScope.invoiceAmnt
	}

	$scope.serviceSmtId = function(smtId){
		if(smtId.length == 0){
			$rootScope.getSMTidBtn = 'true';
		}
	}


	$rootScope.exchange = {};
	$scope.getOldSmtIdDetails = function (exchange) {
	//	alert(exchange.old_smt_id)
if(exchange.old_smt_id == undefined){
	alert('Please enter SMT ID')
}else{
	
	getItemInfoService.getItemInfo(exchange.old_smt_id, window.localStorage['shopName'], window.localStorage['userName'], window.localStorage['password']).then(function (data) {
			//alert(JSON.stringify(data));

			if (data.data.status == 'success') {
				$rootScope.exchangeDetails = data.data.data;
				$rootScope.exchange.brand = $rootScope.exchangeDetails.brand;
				$rootScope.exchange.orderid = $rootScope.exchangeDetails.orderid;
				$rootScope.exchange.old_smt_id = $rootScope.exchangeDetails.SMTID;
				$rootScope.exchange.modelno = $rootScope.exchangeDetails.model;
				$rootScope.exchange.productdesp = $rootScope.exchangeDetails.productdesp;
				$rootScope.avlSMTid = $rootScope.exchangeDetails.avlsmtid;
				//alert(JSON.stringify($rootScope.avlSMTid))
			} else {
				alert(data.data.status);
			}
		})
}
	
	}

	$rootScope.showExchangeForm = 'false';

	$scope.dealerLogin = function (dealerLoginData) {
		dealerLoginService.dealerAuthentication(dealerLoginData, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
			//alert(JSON.stringify(data))
			if (data.data.status == 'Success') {
				alert('Successful authentication!');
				$rootScope.showExchangeForm = 'true';
			} else {
				alert(data.data.status);
			}
		})
	}

})