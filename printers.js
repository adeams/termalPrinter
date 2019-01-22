
var pdf = require('pdfkit');
var pdfName = 'ticket.pdf'; 

var cmdprt = 'pdftops ticket.pdf ticket.ps ';
var prtagain = 'sudo cancel -a -x && lp -d ';

var prt = 'Masung-USB2.0_ESP-002-58mm';

cmdprt += '&& sudo cp lib/gs9.20/gs /usr/bin/ && sudo cancel -a -x && lp -d '+ prt +' ticket.ps -q 100 -s';	

// prtagain += prt +' ticket.ps -q 100 -s';

function printSlipsfix(data,fn){
	var obj = JSON.parse(data);
	console.log(obj);
	var doc = new pdf( { size: 'A7', layout : 'portrait' } );
	var fsp = require('fs');
	var convert =  doc.pipe(fsp.createWriteStream(pdfName));

	// Add an image, constrain it to a given size, and center it vertically and horizontally 
	doc.image(obj.logo.image, {
	   fit: obj.logo.fit,
	   align: obj.logo.align,
	   valign: obj.logo.valign
	});

	// //Embed a font, set the font size, and render some text
	// doc.font(obj.prepaid.font)
 //   .fontSize(parseInt(obj.prepaid.fontSize))
 //   .text(obj.prepaid.text,obj.prepaid.align,parseInt(obj.prepaid.valign))

    //Embed a font, set the font size, and render some text
	doc.font(obj.prepaid.font)
   .fontSize(parseInt(obj.prepaid.fontSize))
   .text(obj.prepaid.text,{align:obj.prepaid.align,width:obj.prepaid.width},parseInt(obj.prepaid.valign))

   //line feed
  doc.moveDown(0.5)
   //Embed a font, set the font size, and render some text
	doc.font(obj.footer.font)
   .fontSize(parseInt(obj.footer.fontSize))
   .text(obj.footer.text,{align:obj.footer.align,width:obj.footer.width})

   //line feed
  doc.moveDown(1)

   //Embed a font, set the font size, and render some text
	doc.font(obj.dateTime.font)
   .fontSize(parseInt(obj.dateTime.fontSize))
   .text(obj.dateTime.text,{align:obj.dateTime.align,width:obj.dateTime.width})

	//# Finalize PDF file 
	doc.end();

	convert.on('finish', function() {
		var exec = require('child_process').exec;

		exec(cmdprt, function(err, stdout, stderr) {
			console.log('send print' );

			// emitticketCountAllkiosk(ticketCount);

			// releaseforGetStat();

			if(err) {
				console.log('print err:', err);
				fn({data:1,err:err})
			}else {										
				fn(null);	
			}
		});
	});
}

function printSlips(data,fn){
	var obj = JSON.parse(data);
	//console.log(obj.dataArray);
	var doc = new pdf( { size: 'A7', layout : 'portrait' } );
	var fsp = require('fs');
	var convert =  doc.pipe(fsp.createWriteStream(pdfName));

	for (var index in obj.dataArray)  {
		console.log(obj.dataArray[index].type);	

		if(obj.dataArray[index].type == "image"){
			// Add an image, constrain it to a given size, and center it vertically and horizontally 
			doc.image(obj.dataArray[index].image, {
			   fit: obj.dataArray[index].fit,
			   align: obj.dataArray[index].align,
			   valign: obj.dataArray[index].valign
			});
		}

		if(obj.dataArray[index].type == "text"){
			//Embed a font, set the font size, and render some text
			if(obj.dataArray[index].valign != ""){
				doc.font(obj.dataArray[index].font)
			   .fontSize(parseInt(obj.dataArray[index].fontSize))
			   .text(obj.dataArray[index].text,{align:obj.dataArray[index].align,width:obj.dataArray[index].width},parseInt(obj.dataArray[index].valign))
			 }else{
			 	doc.font(obj.dataArray[index].font)
			   .fontSize(parseInt(obj.dataArray[index].fontSize))
			   .text(obj.dataArray[index].text,{align:obj.dataArray[index].align,width:obj.dataArray[index].width})
			 }
		}

		if(obj.dataArray[index].type == "linefeed"){
			doc.moveDown(parseInt(obj.dataArray[index].width))	
		}
	}
	//# Finalize PDF file 
	doc.end();

	convert.on('finish', function() {
		var exec = require('child_process').exec;

		exec(cmdprt, function(err, stdout, stderr) {
			console.log('send print' );

			// emitticketCountAllkiosk(ticketCount);

			// releaseforGetStat();

			if(err) {
				console.log('print err:', err);
				fn({data:1,err:err})
			}else {										
				fn(null);	
			}
		});
	});
}

module.exports = {
  printSlips: printSlips,
  printSlipsfix:printSlipsfix
};

// var doc = new pdf( { size: 'A7', layout : 'portrait' } );
// var fsp = require('fs');
// var convert =  doc.pipe(fsp.createWriteStream(pdfName));

// // doc//.font('fonts/PalatinoBold.ttf')
// //    .fontSize(10)
// //    .text('Some text with\n\rwwwww', 10, 100)

// // // Add another page 
// // doc.addPage()
// //    .fontSize(20)
// //    .text('Here is some vector graphics...', 10, 100)

// // // Add some text with annotations 
// // doc.addPage()
// //    .fillColor("blue")
// //    .text('Here is a link!', 100, 100)
// //    .underline(100, 100, 160, 27)
// //    .link(100, 100, 160, 27, 'http://google.com/')


// // Add an image, constrain it to a given size, and center it vertically and horizontally 
// doc.image('../Pictures/cola.png', {
//    fit: [250, 300],
//    align: 'center',
//    valign: 'center'
// });

// //# Finalize PDF file 
// doc.end();

// convert.on('finish', function() {
// 	var exec = require('child_process').exec;

// 	exec(cmdprt, function(err, stdout, stderr) {
// 		console.log('send print' );

// 		// emitticketCountAllkiosk(ticketCount);

// 		// releaseforGetStat();

// 		if(err) {
// 			console.log('print err:', err);
// 		}else {										
			
// 		}
// 	});
// });
