# navigator
View a gigapan image using a telescope and orientation sensor.

To run:
  - connect the Arduino, the cabling, the orientation sensor and the pot
  - open the Arduino app and open the navigator.ino file 
  - upload the code to the Arduino. If you get an error, check the port
  - To see if it's working, open the Serial Monitor. Be sure to set the speed to 115,200.
  - Once the Arduino is sending sensor data, open a Terminal window
  - Probably you will need `cd navigator` to change to the folder where the files are
  - Then start with the command `node index.js http://www.gigapan.com/gigapans/18649` or whatever URL you want
  - Be sure the telescope is centered when you start, as this becomes the reference point
  - Exit with Control-C
  

