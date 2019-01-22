var prints = require('./printers.js');
var fs = require('fs');
//var fileName = 'slips.json';
var fileName = 'slipsArray.json';

fs.readFile(fileName, function (err, data) {
	prints.printSlipsfix(data,function(fn){
		console.log("print fix complete");
	});
});

// fs.readFile(fileName2, function (err, data) {
// 	prints.printSlips(data,function(fn){
// 		console.log("print complete");
// 	});
// });