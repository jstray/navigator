// Navigator
// Read telescope orientation and pan the image on Gigapan


// -- Get gigapan URL to open ---

var url;

if (process.argv.length < 3) {
	console.log("You need to specify a gigapan URL to open")
	return;
}
url = process.argv[2]

// --- Drive the browser ---

const frame_rate = 10;
const x_pan_speed = 10;
const y_pan_speed = 20;
const deadband = 7; 	// scope must be this many degrees away from center to do anything

var pan_rate_x = 0;
var pan_rate_y = 0;
var cx=0, cy=0;

var yaw0, pitch0, roll0;
var yaw, pitch, roll;

var iter = 0;

var chrome = require('chromedriver');
var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

var cel; // canvas element

browser.get(url);

// Go full screen
browser.findElement(webdriver.By.id("full-screen-button"))
	.then( el => {
		browser.actions().click(el).perform();
	});


// hide all UI
browser.findElement(webdriver.By.id("gigapan-navigation"))
	.then( el => {
		browser.executeScript('document.getElementById("gigapan-navigation").style.display = "none";');
		browser.executeScript('document.getElementById("footer-panel").style.display = "none";');
		browser.executeScript('document.getElementById("gigapan-watermark").style.display = "none";');
	});

// Move mouse to initial position and press button
browser.findElement(webdriver.By.tagName("canvas"))
	.then( el => {
		cel = el; 

		browser.actions().click(cel).click(cel).
			mouseMove(cel, {x:0, y:0}).mouseDown(cel).perform();

		setInterval(loop, 1000/frame_rate);
	});


// Deadband -- area near center of control where there is no panning
function deaden(x) {
	if (x > deadband) {
		x -= deadband;
	} else if (x < -deadband) {
		x += deadband;
	} else {
		x = 0;
	}
	return x;

}
// Fired every 50ms. Pans the image at current pan rate
function loop() {
	if (yaw0 === undefined) {
		console.log("not yet")
		return;
	}

	pan_rate_x = yaw-yaw0;
	if (pan_rate_x > 180)
		pan_rate_x -= 360;
	if (pan_rate_x < -180)
		pan_rate_x += 360;
	pan_rate_y = pitch-pitch0;

	pan_rate_x = deaden(pan_rate_x)
	pan_rate_y = deaden(pan_rate_y)

	cx -= x_pan_speed*pan_rate_x/frame_rate;
	cy -= y_pan_speed*pan_rate_y/frame_rate;
	//cx = -iter*10;
	//cy = -iter*5;
	browser.actions()
		.mouseMove(cel, {x:Math.round(cx), y:Math.round(cy)})
		.perform();

	console.log("panx: " + pan_rate_x);
	console.log("pany: " + pan_rate_y + "\n");
	console.log("cx: " + cx);
	console.log("cy: " + cy + "\n");

/*
	iter += 1;
	if (iter > 10) {
		browser.actions()
			.mouseUp(cel)
			.mouseMove(cel, {x:0, y:0})
			.mouseDown(cel)
			.perform();
		cx = 0;
		cy = 0;
		iter=0;
	}
*/
}



// --- Read orientation from Arduino on serial ---

var samples = 0;
var last_yaw, last_pitch;

// Process a line of data received from the serial port
function parseLine(line) {
  tok = line.split(' ');
  //console.log(tok);

  if ((tok[0] == 'Orientation:') && tok.length==4) {
  	yaw = parseFloat(tok[1])
  	roll = parseFloat(tok[2])
  	pitch = parseFloat(tok[3])

  	// Take 10th sample as calibration point, or if yaw suddenly pops
  	samples+=1;
  	var recal = last_yaw && ((Math.abs(yaw-last_yaw) > 20) || (Math.abs(pitch-last_pitch) > 20));
  	if (recal)
  		console.log("Recalibrating...")
	  if ((samples == 10) || recal) {
	  	yaw0 = yaw;
	  	pitch0 = pitch;
	  	roll0 = roll;
	  }

	  last_yaw = yaw;

	  //console.log("yaw:   " +  yaw   + "  yaw0:   " + yaw0)
    //console.log("pitch: " +  pitch + "  pitch0: " + pitch0)
    //console.log("roll:  " +  roll  + "  roll0:  " + roll0 + '\n')
	}
}


// Open serial port
var SerialPort = require('serialport');
var port = new SerialPort('/dev/cu.usbmodem1421', {
  baudRate: 115200
});


// Receive serial data. Collect it into lines.
var buffer = "";

port.on('data', data => {
  str = data.toString('utf-8');
  buffer += str;

  idx = buffer.indexOf('\r\n');
  while (idx >= 0) {
  	line = buffer.substring(0, idx);
  	buffer = buffer.substring(idx+2, buffer.length);

  	//console.log(line);
  	//console.log('-----');
  	parseLine(line);

  	idx = buffer.indexOf('\r\n');
  }
});



