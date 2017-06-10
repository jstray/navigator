// Navigator
// Read telescope orientation and pan the image on Gigapan

const chrome = require('chromedriver');
const webdriver = require('selenium-webdriver');
const fetch = require('node-fetch');

// -- Configuration --
const frame_rate = 10;
const x_pan_speed = 20;
const y_pan_speed = 20;
const deadpan = 7; 	// scope must be this many degrees away from center to do anything
const zoom_speed = 0.1;
const deadzoom = 0.2; // zoom rate is a -0.5 -> 0.5 scale

// If false, use test inputs (run without Arduino)
const read_serial = false;

// -- Get gigapan URL to open ---

var url;

if (process.argv.length < 3) {
	console.log("You need to specify a gigapan URL to open")
	return;
}
url = process.argv[2]


// --- Main ----

// Global variables that we need to pass to browser to initialize the gigapan
var id = url.substring(url.lastIndexOf('/')+1); // id from end of URL
var width,height,levels;

// Load the main gigapan page and parse these variables directly out of the JS code in the HTML
fetch(url)
	.then(response => response.text())
	.then(text => {
		width = text.match(/"width":(\d+)/)[1];
		height = text.match(/"height":(\d+)/)[1];
		levels = text.match(/"levels":(\d+)/)[1];

		startBrowser();
	});


// --- Load the browser with our custom gigapan page  ---

function startBrowser() {

	// Turn off the "browser is being driven by automation banner"
	var chromeCapabilities = webdriver.Capabilities.chrome();
	var chromeOptions = {
	     'args': ['disable-infobars']
	};
	chromeCapabilities.set('chromeOptions', chromeOptions);

	var browser = new webdriver.Builder()
	  .forBrowser('chrome')
	  .withCapabilities(chromeCapabilities)
	  .build();

	// Load our custom page
	browser.get("file://" + __dirname + "/gigapan-emu.html");

	// Call load function with our ill-gotten parameters
	var txt = "loadViewer(" +  id + "," + width + "," + height + "," + levels + ");"
	browser.executeScript(txt);

	// start main loop
	setInterval(loop, 1000/frame_rate);
}


// --- Event Loop  ---

// Current pan/zoom control inputs
var yaw0, pitch0, roll0;
var yaw, pitch, roll;

// Computed rates from control inputs
var pan_rate_x = 0;
var pan_rate_y = 0;
var zoom_rate = 0;

// Current position and zoom 
var cx=1500, cy=400;

// How many times through the loop? Used to delay calbration until sensor settles
var iter = 0;


// Deadband -- area near center of control where there is no panning
function deaden(x, d) {
	if (x > d) {
		x -= d;
	} else if (x < -d) {
		x += d;
	} else {
		x = 0;
	}
	return x;
}


// Fired every frame. Pans the image at current pan rate
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

	pan_rate_x = deaden(pan_rate_x,deadpan)
	pan_rate_y = deaden(pan_rate_y,deadpan)

	cx -= x_pan_speed*pan_rate_x/frame_rate;
	cy -= y_pan_speed*pan_rate_y/frame_rate;

	var delta = deaden(zoom_rate,deadzoom) * zoom_speed;

	// Drive the image pan and zoom at computed rates
  /* REPLACE
		browser.actions()
			.mouseMove(cel, {x:Math.round(cx), y:Math.round(cy)})
			.perform();

		browser.executeScript(makeWheelScript(delta))
	*/

	console.log("panx: " + pan_rate_x);
	console.log("pany: " + pan_rate_y);
	console.log("cx: " + cx);
	console.log("cy: " + cy);
	console.log("delta: " + delta + "\n");
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
  	pitch = -parseFloat(tok[3])

  	// Take 20th sample as calibration point, or if orientation suddenly pops
  	var recal = last_yaw && ((Math.abs(yaw-last_yaw) > 20) || (Math.abs(pitch-last_pitch) > 20));
  	if (recal)
  		console.log("Recalibrating...")
  	samples+=1;
	  if ((samples == 20) || recal) {
	  	yaw0 = yaw;
	  	pitch0 = pitch;
	  	roll0 = roll;
	  }

	  last_yaw = yaw;
	  last_pitch = pitch;

	  //console.log("yaw:   " +  yaw   + "  yaw0:   " + yaw0)
    //console.log("pitch: " +  pitch + "  pitch0: " + pitch0)
    //console.log("roll:  " +  roll  + "  roll0:  " + roll0 + '\n')
	} 

	if (tok[0] == "Pot:" && tok.length==2){

		var raw = parseInt(tok[1]) ;	// 0..1023

		var x = (raw-450)/400;
		zoom_rate = -x;

		//console.log("Zoom: " + zoom_rate + "   x: " + x)
	}
}

// Receive serial data. Collect it into lines.
var buffer = "";

function readSerial(data) {
  buffer += data.toString('utf-8');

  idx = buffer.indexOf('\r\n');
  while (idx >= 0) {
  	line = buffer.substring(0, idx);
  	buffer = buffer.substring(idx+2, buffer.length);

  	parseLine(line);

  	idx = buffer.indexOf('\r\n');
  }
}


// Open serial port if not in test mode
if (read_serial) {

	var serialPort = require('serialport');
	var port = new serialPort('/dev/cu.usbmodem1421', {
	  baudRate: 115200
	});
	port.on('data', readSerial);

} else {

	// Fixed fake control inputs for testing without Arduino
	yaw0 = 0;
	yaw = 20;
	pitch0 = 0;
	pitch = 0;
	zoom_rate = 0;

}




