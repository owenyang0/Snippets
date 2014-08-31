var q = require('q');

function promiseFun(result) {
	setTimeout(function() {
		console.log(result);
	}, Math.random() * 1000);
}

function promiseFun2(wanted, cb) {
	setTimeout(function() {
		//console.log(result);
		cb(wanted);
	}, Math.random() * 1000);
}

function promiseFun3(wanted) {
	var deferred = q.defer();
	setTimeout(function() {
		//console.log(result);
		//cb(wanted);
		deferred.resolve(wanted);
	}, Math.random() * 1000);
	return deferred.promise;
}

// promiseFun(11111);
// promiseFun(22222);
// promiseFun(33333);

promiseFun2(11111, function(result){
	console.log(result);
	promiseFun2(22222, function(result) {
		console.log(result);
		promiseFun2(33333, function(result) {
			console.log(result);
			console.log('----end----');
		});
	});
});

promiseFun3(111)
.then(function(value) {
	console.log(value);
	return promiseFun3(222);
})
.then(function(value) {
	console.log(value);
	return promiseFun3(333);
})
.then(function(value) {
	console.log(value);
})
