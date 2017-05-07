/*
var SerialPort = require('serialport');
var port = new SerialPort('/dev/cu.usbmodem1421', {
  baudRate: 115200
});

port.on('data', function (data) {
  console.log(data.toString('utf-8'));
});
*/

require('chromedriver');
var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder()
  .forBrowser('chrome')
  .build();
 
var cel; // canvas element

var i=0;

function loop() {
	i += 1;
	browser.actions().mouseMove(cel, {x:i*10, y:i*5}).perform();
}

browser.get('http://www.gigapan.com/gigapans/117375');
browser.findElement(webdriver.By.tagName("canvas"))
	.then( el => {
		cel = el;
		browser.actions().click(cel).click(cel).mouseMove(cel, {x:0, y:0}).mouseDown(cel).perform();

		//cel.getLocation().then( loc => console.log(loc) )
		setInterval(loop, 100);
	});

