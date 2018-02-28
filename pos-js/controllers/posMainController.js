
myApp1.directive('cancelConfirmation', function ($compile) {
	return {
		restrict: 'A',
		scope: {},
		link: function (scope, elem, attrs) {
			console.log('link function called');
			var content = '<div ng-click="noti()">Registered Successfully</div><br><div ng-click="noti()">Registered Successfully</div><br><div ng-click="noti()">Registered Successfully</div>;';

			var compiledElem = $compile(content)(scope);
			console.log(compiledElem.html());

			elem.popover({
				html: true,
				content: $compile(content)(scope),
				placement: 'bottom'
			});

			elem.on('shown.bs.popover', function () {
				elem.attr('disabled', true);
			});

			scope.noti = function () {
				alert('sdfsdf')
				elem.popover('hide');
				elem.attr('disabled', false);
			};

			scope.no = function () {
				console.log('no called');
				elem.popover('hide');
				elem.attr('disabled', false);
			};
		}
	};
});

myApp1.directive('myEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.myEnter);
				});

				event.preventDefault();
			}
		});
	};
});

myApp1.filter('numberEx', ['numberFilter', '$locale',
  function(number, $locale) {

    var formats = $locale.NUMBER_FORMATS;
    return function(input, fractionSize) {
      //Get formatted value
      var formattedValue = number(input, fractionSize);

      //get the decimalSepPosition
      var decimalIdx = formattedValue.indexOf(formats.DECIMAL_SEP);

      //If no decimal just return
      if (decimalIdx == -1) return formattedValue;


      var whole = formattedValue.substring(0, decimalIdx);
      var decimal = (Number(formattedValue.substring(decimalIdx)) || "").toString();

      return whole +  decimal.substring(1);
	};
	
  }
])



myApp1.controller('posMainController', 
['$location','cancelInvoiceService','showLastReceiptService', 'getBarcodeBasedProductService', 'getSearchBrandsOrProductsService', 'brandBasedAllCategoryService', '$window', '$scope', '$filter', '$rootScope', 'allCategoryService', 'catBasedSubCatService', 'subCatBasedBrandService', 'brandBasedProductsService', 'mobileNoService', 'newOrderIdService', 'orderSaveService', 'generateInvoiceService', 'newCustomerService', 'confirmInvoiceService', 'getOrderDetailsService', 'brandBasedAllProductsService',
	function ($location,cancelInvoiceService,showLastReceiptService, getBarcodeBasedProductService, getSearchBrandsOrProductsService, brandBasedAllCategoryService, $window, $scope, $filter, $rootScope, allCategoryService, catBasedSubCatService, subCatBasedBrandService, brandBasedProductsService, mobileNoService, newOrderIdService, orderSaveService, generateInvoiceService, newCustomerService, confirmInvoiceService, getOrderDetailsService, brandBasedAllProductsService) {

$scope.today = new Date();
		$scope.orderListArray = [];

		$rootScope.userName = window.localStorage['shopUsername'];

		$rootScope.shopName = window.localStorage['shopName'];

		$rootScope.shopAddress = window.localStorage['shopAddress'];

		$rootScope.loginSessionTime = window.localStorage['loginSessionTime'];

		$rootScope.createdDate = window.localStorage['createdDate'];

		$rootScope.newCustomer = { "createddate": $rootScope.createdDate, "createdat": window.localStorage['shopName'] };

		$rootScope.showGet = 'true';

		$rootScope.showNew = 'true';

		$scope.logOut = function () {
			//alert('1')
			$rootScope.userName = "";
			$rootScope.shopName = "";
			$window.localStorage.clear();
			$rootScope.loginSessionTime = "";
			$rootScope.createdDate = "";
			$rootScope.newCustomer = {};
			$rootScope.allBrandArray = [];
			$rootScope.allBrandCategoryArray = [];
			$rootScope.brandSubCategoryArray = [];
			$rootScope.subCategoryArray = [];
			$rootScope.brandsArray = [];
			$rootScope.productsArray = [];
			$rootScope.brandSubCatArray = [];
			window.location.href="./index.html";
		}

		$scope.getCategories = function () {
			allCategoryService.getAllCategories(window.localStorage['shopName'], window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data));
				if (data.data.status == 'Success') {
					$scope.categoryArray = data.data.data;
				} else {
					alert('Categories not available');
				}
			})
		}

		$scope.getCategories();

		//$rootScope.searchText = 'false';
		$rootScope.subCategory = 'false';
		$rootScope.brandDiv = 'false';
		$rootScope.allBrands = 'true';
		$rootScope.allCat = 'false';
		$rootScope.allSubCat = 'false';
		$rootScope.barcodeFlag = 'false';

		$scope.getSubCat = function (catObj) {
			$rootScope.subCategory = 'true';
			$rootScope.brandDiv = 'false';
			$rootScope.barcodeFlag = 'false';
			// $rootScope.searchText = 'false';
			$rootScope.allBrands = 'false';
			$rootScope.allCat = 'false';
			$rootScope.allSubCat = 'false';
			catBasedSubCatService.getCatBasedSubCat(window.localStorage['shopName'], catObj.categoryname, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data))
				if (data.data.status == 'Success') {

					$scope.subCategoryArray = data.data.data;

				} else {
					alert('Sub Categories not available');
				}
			})

		}

		$rootScope.posOrders = 'true';

		$scope.refreshData = function () {
			angular.forEach($rootScope.productList, function (item) {
				item.qty = 1;
			})
			$rootScope.orderDetailsArray = "";
			$rootScope.showEmptyList = 'true';
			$rootScope.getDetails = 'false';
			$rootScope.getDetailsInfo = 'false';
			$rootScope.posOrders = 'true';
			$rootScope.firstLastName = '';
			$rootScope.productList = [];
			$rootScope.regMobileNo = "";
			$rootScope.mobileUserName = "";
			$rootScope.totalQty = 0;
			$rootScope.orderSavedFlag = 'false';
			//$scope.orderId = "";
			$scope.orderId = "";
			$rootScope.showGet = 'true';
			$rootScope.showNew = 'true';
			$rootScope.invoiceBtn = 'false';
			$rootScope.showPrintBtn = 'false';
			$rootScope.productData = [];
			$rootScope.newCustomer = {};
			$rootScope.newCustomer = { "createddate": $rootScope.createdDate, "createdat": window.localStorage['shopName'] };
			$scope.mobileNumForm.$setPristine();
			$scope.mobileNumForm.$setUntouched();
			$scope.addCustomerForm.$setPristine();
			$scope.addCustomerForm.$setUntouched();
			$scope.mobileno = "";
			$scope.submitted = false;
			$rootScope.orderInfoFlag = 'false';
		}

		/* --------------------All Controller starts here ------------------------   */

		$scope.smtAllBrands = function () {
			$rootScope.subCategory = 'false';
			$rootScope.brandDiv = 'false';
			//$rootScope.searchText = 'false';
			$rootScope.allBrands = 'true';
			$rootScope.allCat = 'false';
			$rootScope.allSubCat = 'false';
			$rootScope.barcodeFlag = 'false';
			brandBasedAllProductsService.getBrandBasedAllProducts(window.localStorage['shopName'], window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				// alert(JSON.stringify(data));
				if (data.data.status == 'success') {
					$rootScope.allBrandArray = data.data.brands;
				} else {
					alert(data.data.status);
					$rootScope.allBrandArray = [];
				}
			})
		}
		//$scope.smtAllBrands();

		/* --------------------All Controller ends here ------------------------   */

		$rootScope.invoiceCancelFlag = 'true';


		$scope.getBrandCategory = function (brand) {
			$rootScope.selBrand = brand.brand;
			$rootScope.subCategory = 'false';
			$rootScope.brandDiv = 'false';
			//$rootScope.searchText = 'false';
			$rootScope.allBrands = 'false';
			$rootScope.allCat = 'true';
			$rootScope.allSubCat = 'false';
			$rootScope.barcodeFlag = 'false';
			brandBasedAllCategoryService.getBrandBasedAllcategory($rootScope.selBrand, window.localStorage['shopName'], window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data));
				if (data.data.status == 'success') {
					$rootScope.allBrandCategoryArray = data.data.categories;
				} else {
					alert(data.data.status);
					$rootScope.allBrandCategoryArray = [];
				}
			})
		}

		$scope.getBrandCatSubCat = function (catObj) {
			$rootScope.subCategory = 'false';
			$rootScope.brandDiv = 'false';
			//$rootScope.searchText = 'false';
			$rootScope.allBrands = 'false';
			$rootScope.allCat = 'false';
			$rootScope.allSubCat = 'true';
			$rootScope.barcodeFlag = 'false';
			catBasedSubCatService.getCatBasedSubCat(window.localStorage['shopName'], catObj.categoryname, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				// alert(JSON.stringify(data))
				if (data.data.status == 'Success') {

					$scope.brandSubCategoryArray = data.data.data;

				} else {
					$scope.brandSubCategoryArray = [];
					alert(data.data.status)
				}
			})
		}

		$rootScope.inputOrderId = 'false';

	$scope.cancelInvoice = function(){
		//alert($rootScope.invoiceCancelFlag)
		if($rootScope.invoiceCancelFlag == 'true'){
				cancelInvoiceService.cancelInvoiceMethod($rootScope.orderId,window.localStorage['userName'], window.localStorage['password']).then(function(data){
			//alert(JSON.stringify(data))
			if(data.data.status == 'invoice cancelled'){
				$("#invoiceIt").modal('hide');
			}else{
				alert(data.data.status)
			}
		})
		}else{
			$("#invoiceIt").modal('hide');
		}
	
	}

		$rootScope.totalQty = 0;

		$rootScope.getTotalQty = function () {
			angular.forEach($rootScope.productList, function (item) {
				$rootScope.totalQty += JSON.parse(item.qty);
			})
		}
		$scope.getBrands = function (subCatObj) {
			$rootScope.subCategory = 'false';
			$rootScope.brandDiv = 'true';
			//$rootScope.searchText = 'false';
			$rootScope.allBrands = 'false';
			$rootScope.allCat = 'false';
			$rootScope.allSubCat = 'false';
			$rootScope.barcodeFlag = 'false';
			subCatBasedBrandService.getSubCatBasedBrand(window.localStorage['shopName'], subCatObj.categoryname, subCatObj.subcategory, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				// alert(JSON.stringify(data));
				if (data.data.status == 'Success') {
					$scope.brandsArray = data.data.data;
				} else {
					alert('No Brands Available');
					$scope.brandsArray = [];
				}
			})
		}

		$rootScope.avlsmtids = [];

		$rootScope.getProducts = function (brandObj) {

			if (brandObj.brand) {

				$scope.brand = brandObj.brand;
				$scope.category = brandObj.category;
			} else {

				$scope.brand = $rootScope.selBrand;
				$scope.category = brandObj.categoryname;
			}
			$rootScope.brandDiv = 'false';
			$rootScope.subCategory = 'false';
			//$rootScope.searchText = 'false';
			$rootScope.allBrands = 'false';
			$rootScope.allCat = 'false';
			$rootScope.allSubCat = 'false';
			$rootScope.barcodeFlag = 'false';
			brandBasedProductsService.getBrandBasedProducts($scope.category, brandObj.subcategory, $scope.brand, window.localStorage['shopName'], window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data))
				if (data.data.status == 'success') {
					$scope.productsArray = data.data.data;
					$rootScope.tax = data.data.tax;
				} else {
					$scope.productsArray = [];
					alert(data.data.status);
				}
			})
		}





		/* product reduceing start */
		$scope.reduceQuantity = function (orderProduct) {
			if (orderProduct.qty > 1) {
				var val = JSON.parse(orderProduct.qty) - 1;
				orderProduct.qty = JSON.stringify(val);
				//JSON.stringify(orderProduct.qty--);
				$rootScope.totalQty = 0;
				$rootScope.productList.forEach(function (productitem) {

					$rootScope.totalQty += JSON.parse(productitem.qty);

				})
			}
		}
		/* product reduceing end */

		/* product adding start */
		$scope.addQuantity = function (orderProduct) {

			if (orderProduct.qty < JSON.parse(orderProduct.inqty)) {
				var val = JSON.parse(orderProduct.qty) + 1;
				orderProduct.qty = JSON.stringify(val);
			} else {
				alert('Only ' + orderProduct.inqty + ' are left');
			}

			//JSON.stringify(orderProduct.qty++);
			$rootScope.totalQty = 0;
			$rootScope.productList.forEach(function (productitem) {

				$rootScope.totalQty += JSON.parse(productitem.qty);

			})
		}
		/* product adding end */


		$scope.enterQuantity = function (orderProduct) {
			if (JSON.parse(orderProduct.qty)<= JSON.parse(orderProduct.inqty)) {
				var val = JSON.parse(orderProduct.qty);
				orderProduct.qty = JSON.stringify(val);
			} else {
				alert('Only ' + orderProduct.inqty + ' are left');
				orderProduct.qty ="1";
			}

			//JSON.stringify(orderProduct.qty++);
			$rootScope.totalQty = 0;
			$rootScope.productList.forEach(function (productitem) {

				$rootScope.totalQty += JSON.parse(productitem.qty);

			})
		}

		$rootScope.productList = productList;

		$index = 0;

		//$scope.discount = 0;

		$rootScope.invoiceBtn = 'false';

		$scope.resetForm = function () {
			//alert('1')
			//$rootScope.newCustomer ={};
			$rootScope.newCustomer = { "createddate": $rootScope.createdDate, "createdat": window.localStorage['shopName'] };
			//alert(JSON.stringify($rootScope.newCustomer))

			$scope.mobileNumForm.$setPristine();
			$scope.mobileNumForm.mobileno.$setPristine();
			$scope.mobileNumForm.$setUntouched();

			$scope.mobileno = "";

			$rootScope.mobileUserData = [];
			$rootScope.orderInfoFlag = 'false';


			// $rootScope.newCustomer = {"createddate":$rootScope.createdDate,"createdat":window.localStorage['shopName']};
		}


		$scope.saveNewCustomer = function (newCustomer) {
			var newCustomerArray = {
				"shop": window.localStorage['shopName'], "firstname": newCustomer.firstname, "lastname": newCustomer.lastname,
				"mobile": "91" + newCustomer.mobile, "altmobile": "91" + newCustomer.altmobile, "email": newCustomer.email,
				"rewardpoints": "0", "discount": newCustomer.discount, "createddate": newCustomer.createddate, "createdat": newCustomer.createdat
			};
			//alert(JSON.stringify(newCustomer))
			newCustomerService.addCustomer(newCustomerArray, window.localStorage['userName'], window.localStorage['password']).then(function (res) {
				//alert(JSON.stringify(res));	
				if (res.data.status == 'Data saved successfully') {
					$rootScope.newCustomer = {};
					$rootScope.newCustomer = { "createddate": $rootScope.createdDate, "createdat": window.localStorage['shopName'] };
					$rootScope.submitted = 'false';
					$('#AddCustomer').modal('hide');
					//alert('Customer Added Successfully');
					$('#addedCustomer').modal('show');
				} else {
					alert(res.data.status);
				}

			});

		}

		$scope.closeModal = function () {
			$('#invoiceIt').modal('hide');
			$rootScope.orderInfoFlag = 'false';
		}


		$scope.saveProductObj = function (productObj) {
			//alert(JSON.stringify(productObj))
			//alert(JSON.stringify($rootScope.orderDetailsArray))
			if($rootScope.orderSavedFlag == 'false'){
				$rootScope.showEmptyList = 'false';

			if (productObj.inqty  > 0) {
				if ($rootScope.productList.indexOf(productObj) >= 0) {
					if (productObj.qty < JSON.parse(productObj.inqty)) {
						productObj.qty++;
					} else {
						alert('Only ' + productObj.inqty+ ' are left');
					}

				} else {
					$rootScope.productList.push(productObj);
				}
				$rootScope.totalQty = 0;
				angular.forEach($rootScope.productList, function (item) {
					$rootScope.totalQty += JSON.parse(item.qty);
				})
			} else {
				alert('No available products');
			}
			}
			
		}

		$rootScope.showEmptyList = 'false';

		$scope.saveshippingType = function (shippingType) {
			//alert(shippingType.smtId);
			$rootScope.shippingType = shippingType.smtId;
		}

		$rootScope.orderSavedFlag = 'false';

		$scope.saveOrder = function () {
			// $rootScope.shippingType = shippingType.smtId;
			$scope.totalQty1 = 0;
			$rootScope.productList.forEach(function (productitem) {

				$scope.totalQty1 += JSON.parse(productitem.qty);

			})

			$rootScope.totalQty1 = $scope.totalQty1;
			var orderList = [];

			$rootScope.productList.forEach(function (productObj) {

				orderList.push({
					 "productdescription": productObj.proddescription, "qty": JSON.stringify(productObj.qty), "unitprice": productObj.offer_price,
					"total": JSON.stringify((productObj.offer_price) * productObj.qty), "enduser_price": productObj.enduser_price, "tax": productObj.tax
				});
				$scope.orderList = orderList;

			})



			$rootScope.orderList = orderList;

			var orderarray = {};

			orderarray.shop = window.localStorage['shopName'];
			//orderarray.orderid = $rootScope.orderId;
			orderarray.createddate = $rootScope.createdDate;
			orderarray.lastupdateddate = "";
			orderarray.status = "Accepted";
			orderarray.shopid = window.localStorage['shopId'];
			if($rootScope.regMobileNo == undefined){
				alert('Mobile number required');
			}else{
				orderarray.customermobile = "91" + $rootScope.regMobileNo;
			}
			
			orderarray.coupon = "";
			orderarray.totalamount = JSON.stringify($scope.total_amtchange());
			orderarray.totalquantity = JSON.stringify($rootScope.totalQty1);
			orderarray.total_items = JSON.stringify($rootScope.orderList.length);
			orderarray.taxes = "";
			orderarray.orderitems = $rootScope.orderList;
			orderarray.shippingtype = "Pick Up";
			orderarray.shippingaddress = [];
			orderarray.rating_usertoshop = "";
			orderarray.rating_shoptouser = "";
			//alert(JSON.stringify(orderarray))
			orderSaveService.saveOrders(orderarray, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				// alert(JSON.stringify(data));
				if (data.data.status == 'data saved') {
					$rootScope.orderId = data.data.orderid;
					$scope.selectedSmtId = [];
					$rootScope.orderSavedFlag = 'true';
					//	alert("Order Saved Successfully");
					$('#confirmOrder').modal('show');
					$rootScope.invoiceBtn = 'true';

				} else if (data.data.status == 'success') {
					$rootScope.orderId = data.data.orderid;
					$scope.selectedSmtId = [];
					$rootScope.orderSavedFlag = 'true';

					$('#confirmOrder').modal('show');
					$rootScope.invoiceBtn = 'true';

				}
				else {
					alert(data.data.status)
				}

			})
		}

		$scope.showSMTIDs = 'false';

		$scope.productsRefreshData = function(){
		//	alert('1')
			$rootScope.subCategory = 'false';
		$rootScope.brandDiv = 'false';
		$rootScope.allBrands = 'true';
		$rootScope.allCat = 'false';
		$rootScope.allSubCat = 'false';
		$rootScope.barcodeFlag = 'false';
			$scope.getCategories();
		}

		$scope.editSmtId = function () {
			$scope.showSMTIDs = 'true';
		}

		

		$scope.editedSMTId = function (productInfo) {
			//alert(JSON.stringify(productInfo))
			$rootScope.productData.forEach(function (productItem) {
				var avlSMTIDs = []
				if(productItem.proddescription == productInfo.proddescription){
					//alert(JSON.stringify(productItem))
					avlSMTIDs.push(productInfo.avlSMTIDs);
					productItem.avlSMTIDs = avlSMTIDs;
				}
				
			})
		//	 alert(JSON.stringify($rootScope.productData))
			$scope.showSMTIDs = 'false';
		}

		$scope.makeInvoice = function () {
			// alert($rootScope.orderId)
			generateInvoiceService.generateInvoice(window.localStorage['shopName'], $rootScope.orderId, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				if (data.data.status == 'success') {
					$rootScope.custName = data.data.username;
					//alert(data.data.coupon_info.length)
					$rootScope.couponInfo = data.data.coupon_info;
					if($rootScope.couponInfo.length != 0 ){
						$rootScope.couponArray = data.data.coupon_info;
					}else{
						$rootScope.couponArray = {"discount":"0"};
					}	
					$rootScope.gstNumber = data.data.gstnumber;
					$rootScope.customerData = data.data.customer_data;
					$rootScope.productData = data.data.product_data;
					$rootScope.invoiceNo = data.data.invoice_no;
					$rootScope.orderId = data.data.orderid;
					$rootScope.invoiceTotalAmt = 0;
					$rootScope.invoiceTotalAmtTaxInc = 0;
					$rootScope.totalTaxAmount = 0;
					$scope.invoiceTotal();
					$("#invoiceIt").modal('show');
				} else if (data.data.status == 'Products are not available in this shop') {
					alert(data.data.status)
				} else {
					alert(data.data.status);
				}
			})
		}

		$rootScope.printSection = 'true';
		$rootScope.showHint = 'false';

		$scope.blur = function (userData) {
			if(userData.mobileno >= 2){
				$rootScope.userMobileNum = "91"+userData.mobileno;
			$rootScope.mobileUserData = [];
			mobileNoService.getMobileno(window.localStorage['shopName'], $rootScope.userMobileNum, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data))
				if (data.data.status == 'success') {
					// $('#selectUser').modal('hide');
					$rootScope.mobileUserData = data.data.mobile_details;
					$rootScope.showHint = 'true';

				} else {
					alert(data.data.message);
				}

			})
			}
			
		}

		$scope.saveMobile = function (mobileObj) {
			$rootScope.regMobileNo = mobileObj.mobile;
			$rootScope.mobileUserName = mobileObj.firstname;
			$('#selectUser').modal('hide');
			$scope.mobileNumForm.$setPristine();
			$scope.mobileNumForm.$setUntouched();
			$scope.mobileno = "";
			$rootScope.showHint = 'false';
		}

		$scope.getMobileNum = function (userData) {
			$rootScope.userMobileNum = userData.mobileno;
			mobileNoService.getMobileno(window.localStorage['shopName'], $rootScope.userMobileNum, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				// alert(JSON.stringify(data))
				if (data.data.status == 'success') {
					$('#selectUser').modal('hide');
					var mobileUserData = data.data.mobile_details;
					$rootScope.regMobileNo = mobileUserData.mobile;
					$rootScope.mobileUserName = mobileUserData.firstname;
					$scope.mobileNumForm.$setPristine();
					$scope.mobileNumForm.$setUntouched();
					$scope.mobileno = "";

				} else {
					alert(data.data.status);
				}

			})
		}

		$scope.getOrderId = function () {
			$rootScope.showGet = 'false';
			$rootScope.showNew = 'false';
			$rootScope.inputOrderId = 'true';
			// alert($scope.orderId)
			newOrderIdService.getNewOrderId(window.localStorage['shopName'], window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//  alert(JSON.stringify(data));
				if (data.data.status == 'success') {
					$scope.orderId = data.data.orderid;
					$rootScope.orderId = $scope.orderId;

				} else {
					alert('There is an error');
				}
			})
		}

		$scope.productCat = function (productCatObj) {
			if ($scope.orderListArray.indexOf(productCatObj) >= 0) {
				productCatObj.quantity++;
			}
			else {
				$scope.orderListArray.push(productCatObj);

				$scope.orderListArray.forEach(function (orderItem) {
					orderItem.quantity = 1;
				})
			}
		}

		$rootScope.showPrintBtn = 'false';

		$scope.clearOrders = function (orderId) {
		orderId = "";
			$scope.orderId = "";
			$rootScope.orderId = "";
			$rootScope.inputOrderId = 'true';

			$rootScope.showGet = 'true';
			$rootScope.showNew = 'true';
			$scope.discount = "";
			$rootScope.orderInfoFlag = 'false';

		}

		$scope.showPaymentMsg = 'false';
		$scope.showCashMsg = 'false';

		$scope.confirmOnlineInvoiceMethod = function (val,method) {


			//alert(JSON.stringify(val))
			var confirmInvoiceArray = {};
			$rootScope.paymentPaid = method;
			//alert($rootScope.paymentMethod);
			confirmInvoiceArray.orderid = $rootScope.orderId;
			var paymentType = [];
			if($scope.paymentMethod == "" || $scope.paymentMethod == undefined){
						$scope.showPaymentMsg = 'true';
				}else{
			if ($rootScope.orderDetailsArray.paymenttype == "cashondelivery" || $rootScope.orderDetailsArray.paymenttype == "COD") {
				confirmInvoiceArray.paymenttype = JSON.stringify($rootScope.invoiceTotalAmtTaxInc);
			} else {
				confirmInvoiceArray.paymenttype = "Payu";
			}


			confirmInvoiceArray.totalamount = JSON.stringify($rootScope.invoiceTotalAmtTaxInc);
			confirmInvoiceArray.invoiceid = $rootScope.invoiceNo;
			confirmInvoiceArray.mobile = $rootScope.regMobileNo;
			confirmInvoiceArray.shop = window.localStorage['shopName'];
			confirmInvoiceArray.createddate = $rootScope.createdDate;
			var orderItems = [];
			$rootScope.productData.forEach(function (productItem) {
					orderItems.push({ "productdescription": productItem.proddescription,
					 "smtids": productItem.avlSMTIDs,"tax_amount": JSON.stringify(productItem.tax_amount),"tax_including_total":JSON.stringify(productItem.tax_including_total)});
					$scope.orderItems = orderItems;
				})
			confirmInvoiceArray.orderitem = $scope.orderItems;

			//alert(JSON.stringify(confirmInvoiceArray))
			confirmInvoiceService.confirmInvoice(window.localStorage['shopName'], confirmInvoiceArray, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data))
				if (data.data.status == "data updated") {
					$rootScope.showPrintBtn = 'true';
					$rootScope.invoiceCancelFlag == 'false';
					$('#invoiceOrder').modal('show');

				} else if (data.data.status == "saved") {
					$rootScope.showPrintBtn = 'true';
					$rootScope.invoiceCancelFlag == 'false';
					$('#invoiceOrder').modal('show');

				}
				else {
					alert(data.data.status);
				}
			})
				}

		}

		$scope.confirmInvoiceMethod = function (val, method, type,cashGiven) {
			var confirmInvoiceArray = {};
			$rootScope.paymentPaid = method;
			
			confirmInvoiceArray.orderid = $rootScope.orderId;
			var paymentType = [];


				if($scope.paymentMethod == "" || $scope.paymentMethod == undefined){
						$scope.showPaymentMsg = 'true';
				}else{
				$scope.showPaymentMsg = 'false';
				$scope.showCashMsg = 'false';
				if (method == 'Cash') {
					confirmInvoiceArray.paymenttype = JSON.stringify($rootScope.invoiceTotalAmtTaxInc);
				} else if (method == 'Card') {

					confirmInvoiceArray.paymenttype = "Card";
				} else {

					confirmInvoiceArray.paymenttype = type;
				}

				confirmInvoiceArray.totalamount = JSON.stringify($rootScope.invoiceTotalAmtTaxInc);
				confirmInvoiceArray.invoiceid = $rootScope.invoiceNo;
				if($rootScope.regMobileNo.length == '10'){
					confirmInvoiceArray.mobile = "91" + $rootScope.regMobileNo;
				}else{
					confirmInvoiceArray.mobile = $rootScope.regMobileNo;
				}
				
				confirmInvoiceArray.shop = window.localStorage['shopName'];
				confirmInvoiceArray.createddate = $rootScope.createdDate;
				var orderItems = [];
				$rootScope.productData.forEach(function (productItem) {
					orderItems.push({ "productdescription": productItem.proddescription,
					 "smtids": productItem.avlSMTIDs,"tax_amount": JSON.stringify(productItem.tax_amount),"tax_including_total":JSON.stringify(productItem.tax_including_total)});
					$scope.orderItems = orderItems;
				})
				confirmInvoiceArray.orderitem = $scope.orderItems;


				confirmInvoiceService.confirmInvoice(window.localStorage['shopName'], confirmInvoiceArray, window.localStorage['userName'], window.localStorage['password']).then(function (data) {

					if (data.data.status == "data updated") {
						$rootScope.showPrintBtn = 'true';
						$scope.cash_given = "";
			$scope.return_amt = "";
			$scope.paymentMethod = "";
						$('#invoiceOrder').modal('show');

						$rootScope.invoiceCancelFlag = 'false';

					} else if (data.data.status == "saved") {
						$rootScope.showPrintBtn = 'true';

						$('#invoiceOrder').modal('show');
						$rootScope.invoiceCancelFlag = 'false';
					}else if(data.data.status == 'out off stock'){
						alert('Available SMT Ids are'+data.data.avlsmts)
					}
					else {
						alert(data.data.status);
					}
				})
			}
		}

		$rootScope.getDetails = 'false';
		$rootScope.getDetailsInfo = 'false';
		$scope.getOrderDetails = function (orderId) {

			if (orderId == undefined) {
				alert('Enter order Id')
			} else {
				
				//alert(JSON.stringify(orderId));
				$rootScope.orderId = orderId;
				getOrderDetailsService.orderDetailsByOrderId(window.localStorage['shopName'], $rootScope.orderId, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
					//alert(JSON.stringify(data));
					if (data.data.status == 'success') {
						$rootScope.showGet = 'false';

				$rootScope.showNew = 'false';
						$rootScope.getDetailsInfo = 'true';
						$rootScope.firstLastName = data.data.username;
						$rootScope.productList = data.data.orderitems;
						$rootScope.regMobileNo = data.data.customer_mobile;
						$rootScope.shippingaddress = data.data.shipping_address;
						if(data.data.billing_address){
							$rootScope.billingaddress = data.data.billing_address;
						}
						
						$rootScope.orderDetailsArray = data.data.order_details;
						//$rootScope.verifyCode = data.data.verifycode;
						if ($rootScope.orderDetailsArray.status == 'Pending' || $rootScope.orderDetailsArray.status == 'Accepted') {
							$rootScope.invoiceBtn = 'true';
							//$rootScope.productData = data.data.order_details;
						}

						if ($rootScope.orderDetailsArray.paymenttype == 'COD' || $rootScope.orderDetailsArray.paymenttype == 'cashondelivery') {
							$rootScope.getDetails = 'true';

						}

						$rootScope.showEmptyList = 'false';
						$rootScope.totalQty = 0;
						// $scope.totalPrice();
						$rootScope.getTotalQty();
					} else {
						alert(data.data.status);
					}
				})
			}
		}

		$scope.getBarcodeProduct = function (barcodeNum) {
			//alert(barcodeNum)
			if(barcodeNum){
			getBarcodeBasedProductService.getBarcodeBasedProductMethod(window.localStorage['shopName'], barcodeNum, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data))
				
				if (data.data.status == 'success') {
					$rootScope.allSubCat = 'false';
				$rootScope.allCat = 'false';
				$rootScope.brandDiv = 'false';
				$rootScope.subCategory = 'false';
				$rootScope.allBrands = 'false';
				$rootScope.barcodeFlag = 'true';
					$rootScope.barcodeArray = data.data.barcode_details;
				}else if(data.data.status == 'shop/barcode not available' ) {
					alert('Enter valid Barcode');
				}
				else {
					alert(data.data.status);
				}
			})
		}else if(barcodeNum == undefined){
			alert('Please enter Barcode')
		}
		}


		$scope.showLastReceipt = function () {
			//alert('1')
			showLastReceiptService.showLastReceiptMethod(window.localStorage['shopName'], window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data))
				if (data.data.return == 'success') {
					$rootScope.orderId = data.data.latest_orderid;
				} else {
					alert(data.data.return)
				}
			})
		}

		$rootScope.orderInfoFlag = 'false';

		$scope.getOrderInfoDetails = function (orderObj) {

			$rootScope.orderInfoId = orderObj.orderId;

			getOrderDetailsService.orderDetailsByOrderId(window.localStorage['shopName'], $rootScope.orderInfoId, window.localStorage['userName'], window.localStorage['password']).then(function (data) {
				//alert(JSON.stringify(data));
				if (data.data.status == 'success') {
					$rootScope.showOrderPrint = 'true';
					$rootScope.orderInfoProductList = data.data.order_details;
					$rootScope.orderInfoMobile = data.data.customer_mobile;
					$rootScope.orderInfoDetailsArray = data.data.orderitems;
					$rootScope.orderInfoUser = data.data.username;
					$rootScope.orderInfoFlag = 'true';
					// alert(JSON.stringify($rootScope.orderInfoDetailsArray))
				} else {
					alert(data.data.status);
				}
			})
		}

		$rootScope.showVerify = 'false';

		$rootScope.showOrderPrint = 'false'

		$scope.verifyCode = function (verifycode) {
			//alert(JSON.stringify(verifycode))
			if ($rootScope.orderDetailsArray.verifycode == verifycode) {
				$rootScope.showVerify = 'true';
			} else {
				$('#verifyCode').modal('show');
			}
		}

		$scope.closeVerifyAlert = function () {
			$('#verifyCode').modal('hide');
		}

		/* product deletion start */
		$scope.deleteProduct = function (orderProduct) {
			orderProduct.qty = 1;
			$rootScope.productList.splice($rootScope.productList.indexOf(orderProduct), 1);
			$rootScope.totalQty = 0;
			$rootScope.productList.forEach(function (productitem) {

				$rootScope.totalQty += JSON.parse(productitem.qty);

			})
		}
		/* product deletion end */

		/* total items quantity start */
		$scope.totalQuantity = function () {
			var total = 0;
			angular.forEach($rootScope.productList, function (item) {
				total += JSON.parse(item.qty);
			})
			return total;
		}
		/* total items quantity end */

		/* subtotal price on quantity start */
		$scope.totalPrice = function () {
			var total = 0;

			angular.forEach($rootScope.productList, function (item) {
				if (item.offer_price) {
					total += item.qty * item.offer_price;
				} else {

					total += item.qty * item.unitprice;

				}

			})

			$scope.total_discount_change($scope.discount);
			return total;
		}



		$scope.invoiceTotal = function () {
			angular.forEach($rootScope.productData, function (item) {

				$rootScope.totalTaxAmount += JSON.parse(item.tax_amount);

				$rootScope.invoiceTotalAmtTaxInc += JSON.parse(item.tax_including_total);
				
				$rootScope.invoiceTotalAmt += JSON.parse(item.offer_price*item.qty);

			})
	
		//	$rootScope.invoiceTotalAmtTaxInc = $rootScope.invoiceTotalAmtTaxInc-$rootScope.couponArray.discount;
		}

		$scope.taxAmount = function () {
			$rootScope.incTaxTotal = 0;
			angular.forEach($rootScope.productData, function (product) {

				$rootScope.incTaxTotal += (JSON.parse(product.qty) * JSON.parse(product.unitprice)) + $scope.total_tax_change(product);
			})
			if ($scope.discountVal > 0) {
				$rootScope.incTaxTotal = $rootScope.incTaxTotal - $scope.discountVal;
			}
			//alert($rootScope.incTaxTotal);
		}


		/* total discount start */
		$scope.total_discount_change = function (discount) {
			var total = 0;
			angular.forEach($scope.productList, function (item) {
				if (item.enduser_price) {
					total += item.qty * item.offer_price;
				} else {
					total += item.qty * item.unitprice;

				}

			})
			$scope.total = total;

			var discountVal = Math.round((total * discount / 100.0) * 100) / 100;
			var total = total - discount;
			$scope.discountVal = discountVal;
			//alert($scope.discountVal)
		}
		/* total discount end */

		/* total amount start */
		$scope.total_amtchange = function () {

			var totalVal = 0;
			//totalVal = Math.round(($scope.total + $scope.taxVal)-$scope.discountVal);
			if (isNaN($scope.discountVal)) {
				totalVal = Math.round($scope.total);

			}
			else {
				totalVal = Math.round(($scope.total) - $scope.discountVal);

			}
			$scope.totalVal = totalVal;
			return totalVal;
		}
		/* total amount end */

		$scope.total_tax_change = function (serviceInfo) {

			$scope.total = serviceInfo.tax;
			var taxVal = Math.round($scope.total * serviceInfo.unitprice / 100);
			$scope.taxVal = taxVal;
			//alert($scope.taxVal);
			return $scope.taxVal;
		}


		/* return change start */
		var returnchangeVal = 0;
		$scope.ReturnChange = function () {
			returnchangeVal = Math.round($scope.paidAmount - $scope.totalVal);
			$scope.returnchangeVal = returnchangeVal;
		}

		$scope.paidChange = function (paidAmount) {
			$scope.paidAmount = paidAmount;
			$scope.ReturnChange();
		}
		/* return change end */

		$scope.paymentFlag = 'cash';
		$scope.paymentMethod = 'Cash';
		$scope.selectedPaymentMethod = function (paymentMethod) {
			//alert(paymentMethod)
			if (paymentMethod == 'Cash') {
				//alert(paymentMethod)
				$scope.paymentFlag = 'cash';
				$scope.paymentMethod = paymentMethod;
				//	alert('1'+$scope.paymentMethod)
			}
			else {
				//alert(paymentMethod)
				$scope.paymentFlag = 'card';
				$scope.paymentMethod = paymentMethod;
				//alert('2'+$scope.paymentMethod)
			}
			//alert($scope.paymentFlag)
		}

		/* print page start */
		$scope.printToCart = function (printSectionId) {
			var innerContents = document.getElementById(printSectionId).innerHTML;
			var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
			popupWinindow.document.open();
			popupWinindow.document.write('<html><head><link href="bootstrap.min.css" rel="stylesheet"></head><div onload="window.print()">' + innerContents + '</html>');
			popupWinindow.document.close();
			$('#invoiceIt').modal('hide');
			$rootScope.productList = [];
			$rootScope.regMobileNo = "";
			$rootScope.mobileUserName = "";
			$rootScope.showPrintBtn = 'false';
			$rootScope.firstLastName = '';
			$scope.orderId = "";
			$rootScope.orderId = "";
			$rootScope.totalQty = "";
			$scope.refreshData();
			$scope.clearOrders($scope.orderId);
			$rootScope.invoiceBtn = 'false';
			location.reload();
		}
		/* print page end */

		/* pdf format start */
		$scope.export = function () {
			html2canvas(document.getElementById('printSectionId'), {       /*exportthis*/
				onrendered: function (canvas) {
					var dataa = canvas.toDataURL();
					var docDefinition = {
						content: [{
							image: dataa,
							width: 500,
						}]
					};
					pdfMake.createPdf(docDefinition).download("test.pdf");
				}
			});
		}
		/* pdf format end */

		/*Date method*/
		$scope.CurrentDate = new Date();
		/*var date_format = "dd/MM/yyyy hh:mm:ss";	
		$scope.current_date = new Date();	
		$scope.current_date_format_invoice = $filter('date')($scope.current_date,date_format);*/
		/*date method ends*/

		$scope.printOrderInfo = function (printOrderSectionId) {
			var innerContents = document.getElementById(printOrderSectionId).innerHTML;
			var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
			popupWinindow.document.open();
			popupWinindow.document.write('<html><head><link href="bootstrap.min.css" rel="stylesheet"></head><div onload="window.print()">' + innerContents + '</html>');
			popupWinindow.document.close();

		}




	}]);

