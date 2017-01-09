var gpio = require("gpio");

var LED_ON = true,
    LED_OFF = false;
var PIN_MODE = "pushpull";

gpio.initialize();
gpio.on('initialize', function() {
       gpio.open(26, "in", PIN_MODE);
});
var value;
gpio.on('open', function(pin, dir, mode) {
	while(1) {
		if (pin == 26) {
		gpio.read(26, function(pin, value){
			gpio.open(27, "out", PIN_MODE);
		});
		}

		if (pin == 27) {
			if (value == true) {
			gpio.write(27, LED_ON);
			} else {
			gpio.write(27, LED_OFF);
			}
		}
		}
});
