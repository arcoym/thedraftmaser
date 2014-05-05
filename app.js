
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request'); // library to make requests to remote urls
var ejs = require('ejs');


// the ExpressJS App
var app = express()

var newValue;
var tempValue;
var idealTemp;
var angle;
var outsideTempF = 75;
var outsideTempC = 22;
var tempDiff = 0;

// Setup Variables
var name;
var zipcode;
var scale;
var tempRange;
var allergies;
	
  //app.use('/views', express.static(__dirname + '/views')); 
  //app.set('/views', __dirname + '/views');


app.configure( function() { 
	/*
	   use a directory called js in your project directory
	   to serve static files. This is so you can serve client-side
	   javaScript files with your index page.
	   
	   If you want to serve CSS, and/or lots of HTML files, it's 
	   useful to set up a static directory for them. express.js 
	   will then serve files from those directories like a regular
	   webserver.
	*/

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use('/js', express.static(__dirname + '/js')); 
  app.use(express.bodyParser());

  console.log("Express configured. Listening on port 8080");
});


// if the request is for /state without a value, return the current
// value of state. If there is no value for state,
// return a message to that effect:
app.get('/state/:value', function (req, res) {

	 newValue = req.params.value;

	//send a response to the client:
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(newValue);
	res.end();
});

app.get('/state', function (req, res) {
	//send a response to the client:
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(newValue);
	res.end();
});

app.get('/temp/:value', function (req, res) {
	tempValue = req.params.value;	
});

app.get('/angle/:value', function (req, res) {
	currentAngle = req.params.value;
});

// function for serving index.html, or index. anything:
app.get('/index*', function (req, res) {
   res.sendfile('index.html');
});

// respond to web GET requests with the index.html page.
// this is how you serve a file that's not in a static directory:
app.get('/', function (req, res) {
   res.sendfile('index.html');
});

//ROUTING OF SETUP PAGES
app.get('/setup', function (req, res) {
   res.sendfile('setup1.html');
});

// INITIAL SETUP OF DEVICE - saving variables below goes here
app.get('/ready', function (req, res) {
		res.sendfile('setup2.html');
});
app.get('/later', function (req, res) {
		res.sendfile('later.html');
});


app.post('/setup2', function (req, res) {
	nameNew = req.body.name;
	console.log(nameNew);
	//res.sendfile('setup3.html')
	res.render('setup3', { 
		name: nameNew 
	}, function (err,data) {
		if(!err) {	
			res.write(data);
			res.end();
		}
		console.log(err);
		});
});

app.post('/setup3', function (req, res) {
	zipcode = req.body.zipcode;
	console.log(zipcode);
	res.sendfile('setup4.html');
});

app.post('/setup4', function (req, res) {
	scale = req.body.scale;

	//celsius scale
	63-67
	68-72
	73-77

	//fahrenheit scale
	17-19
	20-22
	24-26

	if(scale == 0) {
		//render next page with C values
		res.render('setup5.ejs', {
			range1: '17-19',
			range2: '20-22',
			range3: '24-26'
		});
	};

	if(scale == 1) {
		//render next page with F values
		res.render('setup5.ejs', {	
			range1: "63-67",
			range2: "68-72",
			range3: "73-77"
		});
	};
});

app.post('/setup5', function (req, res) {
	tempRange = req.body.range;
	console.log(tempRange);

	res.sendfile('setup6.html');
});

app.post('/setupfinish', function (req, res) {
	allergies = req.body.allergies;
	console.log(allergies);
	res.sendfile('setupfinish.html');
});


//BIG FUNCTION THAT DOES EVERYTHING HERE
var math = funtion() {

	if(tempValue == idealTemp) {
		// do nothing		
	}

	//set idealTemp for CELSIUS
	if(scale == 0) {
		if(tempRange == 1) {
			idealTemp = 15;
		}
		if(tempRange ==2) {
			idealTemp = 18;
		}
		if(tempRange ==3) {
			idealTemp = 21;
		}
		if(tempRange = 4) {
			idealTemp = 25;
		}
		if(tempRange ==5) {
			idealTemp = 28;
		}
		if(tempRange ==6) {
			idealTemp = 21;
		}
	}

	//set idealTemp for CELSIUS
	if(scale == 1) {
		if(tempRange == 1) {
			idealTemp = 55;
		}
		if(tempRange ==2) {
			idealTemp = 65;
		}
		if(tempRange ==3) {
			idealTemp = 70;
		}
		if(tempRange = 4) {
			idealTemp = 75;
		}
		if(tempRange ==5) {
			idealTemp = 85;
		}
		if(tempRange ==6) {
			idealTemp = 70;
		}
	}
	else {
		console.log('something is up');
	}


	if (scale == 0) {

		if(tempValue > idealTemp) {
			 tempDiff= tempValue-idealTemp;
			if(outsideTempC < idealTemp) {
			
			var tempChange = idealTemp - outsideTempC;

				if(tempChange <= 2) {
					angle = 2;
				}
				if(tempChange >= 3 || tempChange <=5) {
					angle = 3;
				}
				if(tempChange >= 6) {
					angle = 4;
				}
			}	
		} 

		if(tempValue > idealTemp) {
			tempDiff = tempValue-idealTemp;
			if(outsideTempC > idealTemp) {
			
			var tempChange =  outsideTempC - idealTemp;
				
				if(tempChange <= 3) {
					angle = 2;
				}
				if(tempChange >= 4 || tempChange <=8) {
					angle = 3;
				}
				if(tempChange >= 9) {
					angle = 4;
				}
			}	
		} 

		if(tempValue < idealTemp) {
			tempDiff = idealTemp - tempValue;
			
			if(outsideTempC < idealTemp) {
			
			var tempChange = idealTemp - outsideTempC;

				if(tempChange <= 2) {
					angle = 2;
				}
				if(tempChange >= 3 || tempChange <=7) {
					angle = 3;
				}
				if(tempChange >= 8) {
					angle = 4;		
				}
			}	
		}

		if(tempValue < idealTemp) {
			tempDiff = idealTemp - temValue;
			
			if(outsideTempC > idealTemp) {
			
			var tempChange = outsideTempC - idealTemp;
				if(tempChange <= 2) {
					angle = 2;
				}
				if(tempChange >= 3 || tempChange <=7) {
					angle = 3;
				}
				if(tempChange >= 8) {
					angle = 4;
				}			
			}	
		}
	}

	// FOR FAHRENHEIT

	if (scale == 1) {
		
		//C to F math =	 Multiply by 9, then divide by 5, then add 32
		tempValueF = ((tempValue * 9) / 5) + 32;

		if(tempValueF > idealTemp) {
			tempDiff = tempValueF-idealTemp;
			
			if(outsideTempF < idealTemp) {
			var tempChange = idealTemp - outsideTempF;
				if(tempChange <= 2) {
					angle = 2;
				}
				if(tempChange >= 3 || tempChange <=7) {
					angle = 3;
				}
				if(tempChange >= 8) {
					angle = 4;
			
				}
			}	
		} 

		if(tempValueF > idealTemp) {
			tempDiff = tempValueF-idealTemp;
			
			if(outsideTempF > idealTemp) {
			var tempChange =  outsideTempF - idealTemp;
				if(tempChange <= 2) {
					angle = 2;
				}
				if(tempChange >= 3 || tempChange <=7) {
					angle = 3;
				}
				if(tempChange >= 8) {
					angle = 4;
				}			
			}
		}	

		if(tempValueF < idealTemp) {
			tempDiff = idealTemp - tempValueF;
			
			if(outsideTempF < idealTemp) {
			var tempChange = idealTemp - outsideTempF;
				if(tempChange <= 2) {
					angle = 2;
				}
				if(tempChange >= 3 || tempChange <=7) {
					angle = 3;
				}
				if(tempChange >= 8) {
					angle = 4;
				}			
			}	
		}

		if(tempValueF < idealTemp) {
			tempDiff = idealTemp - temValue;
			
			if(outsideTempF > idealTemp) {
			var tempChange = outsideTempF - idealTemp;
				if(tempChange <= 2) {
					angle = 2;
				}
				if(tempChange >= 3 || tempChange <=7) {
					angle = 3;
				}
				if(tempChange >= 8) {
					angle = 4;
				}
			}	
		}
	}
}

// start listening on port 8080:
app.listen(8080);

