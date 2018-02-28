
/*pagination code again start*/
	myApp1.filter('startFrom', function() {
		return function(input, start) {
			start = +start; //parse to int
			return input.slice(start);
		}
	});
/*pagination code end*/