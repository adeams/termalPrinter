var prints = require('./printers.js');
var fs = require('fs');
//var fileName = 'slips.json';
var fileName = 'slipsArray.json';
var fileObjName = 'rabbitTopUp.json';

// fs.readFile(fileName, function (err, data) {
// 	prints.printSlipsfix(data,function(fn){
// 		console.log("print fix complete");
// 	});
// });

fs.readFile(fileObjName, function (err, data) {
	//console.log(JSON.parse(data));
	prints.convordSlips(data,function(fn1){
		console.log("convordSlips complete");
		prints.printSlips(fn1,function(fn){
			console.log("print complete");
		});	
	});
});

// fs.readFile(fileName, function (err, data) {
// 	//console.log(JSON.parse(data));
// 	prints.printSlips(data,function(fn){
// 		console.log("print complete");
// 	});
// });