var SerialPort = require('serialport');
var port = new SerialPort('/dev/cu.usbmodem1421', {
  baudRate: 115200
});

port.on('data', function (data) {
  console.log(data.toString('utf-8'));
});