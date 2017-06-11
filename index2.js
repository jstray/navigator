// Navigator
// Read telescope orientation and pan the image on Gigapan

const chrome = require('chromedriver');
const webdriver = require('selenium-webdriver');
const fetch = require('node-fetch');

// -- Configuration --
var frame_rate = 10;
var x_pan_speed = 0.5;  // units: equivalent arrow key presses per second per degree of deflection
var y_pan_speed = 0.5;
var deadpan = 5; 	// scope must be this many degrees away from center to do anything

var zoom_speed = 2; // units: equivalent zoom clicks per second at full throttle
var deadzoom = 0.1; // zoom rate is about -0.8 -> 0.8 scale

// If false, use test inputs (run without Arduino)
var read_serial = true;

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

// Load the main gigapan page and parse image params directly out of the HTML
fetch(url)
	.then(response => response.text())
	.then(text => {
		width = text.match(/"width":(\d+)/)[1];
		height = text.match(/"height":(\d+)/)[1];
		levels = text.match(/"levels":(\d+)/)[1];

		console.log("Image width " + width);
		console.log("Image height " + height + "\n");

		startBrowser();
	});

// --- Load the browser with our custom gigapan page  ---

var browser;

function startBrowser() {

	// Load our custom page
	var page="file://" + __dirname + "/gigapan-emu.html";

	// Start chrome in fullscreen, use "app" to load without address bar, also conviently goes to this URL
	var chromeCapabilities = webdriver.Capabilities.chrome();
	var chromeOptions = {
		'args': ['--start-fullscreen', '--app=' + page]
	};
	chromeCapabilities.set('chromeOptions', chromeOptions);

	browser = new webdriver.Builder()
	  .forBrowser('chrome')
	  .withCapabilities(chromeCapabilities)
	  .build();

	// wait for page to load...
	browser.findElement(webdriver.By.id("gigapan-viewer"))
		.then( () => {
			// Call load function with our ill-gotten parameters
			var txt = "loadViewer(" +  id + "," + width + "," + height + "," + levels + ");"
			browser.executeScript(txt);

			// start main loop
			setInterval(loop, 1000/frame_rate);			
		});
}


// --- Event Loop  ---

// Current pan/zoom control inputs
var yaw0, pitch0, roll0;
var yaw, pitch, roll;
var zoom_rate = 0;

var iter=0;

// Deadband -- area near center of control where there is no panning
function deaden(x, d) {
	if (x < d && x > -d) {
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

	// Compute rates from control inputs
	var pan_rate_x = yaw-yaw0;
	if (pan_rate_x > 180)
		pan_rate_x -= 360;
	if (pan_rate_x < -180)
		pan_rate_x += 360;
	var pan_rate_y = pitch-pitch0;

	pan_rate_x = deaden(pan_rate_x,deadpan)
	pan_rate_y = deaden(pan_rate_y,deadpan)

	var dx = 0.025*x_pan_speed*pan_rate_x/frame_rate;		// 0.025 = one arrow key press in gigapan viewer
	var dy = 0.025*y_pan_speed*pan_rate_y/frame_rate;

	// Drive the image pan and zoom at computed rates by calling into browser functions
	var txt = "if (window.panBy) panBy(" +  dx + "," + dy + ");";
	browser.executeScript(txt);

	var dzoom = Math.pow(2, deaden(zoom_rate,deadzoom) * zoom_speed / frame_rate); // 2 = gigapan zoomPerClick

	txt = "if (window.zoomBy) zoomBy(" + dzoom + ");";
	browser.executeScript(txt);

	console.log("panx: " + dx);
	console.log("pany: " + dy);
	console.log("zoom: " + dzoom + "\n");

	// if running in test more: reverse zoom after 8s, stop pan after 12s
	if (!read_serial) {
		iter += 1;
		if (iter == 8*frame_rate) {
			zoom_rate *= -1;
		}
		if (iter == 12*frame_rate) {
			yaw=0;
			pitch=0;
		}
	}
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
	zoom_rate = 0.3;
}




