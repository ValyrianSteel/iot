var gpio = require("gpio");

var LED_ON = true,
    LED_OFF = false;
var LED_PIN_MODE = "pushpull";

gpio.initialize();
gpio.on('initialize', function() {
       gpio.open(27, "out", LED_PIN_MODE);
});


gpio.on('open', function(pin, dir, mode) {
      gpio.write(pin, LED_ON);
    
      setTimeout(function() {
          gpio.write(pin, LED_OFF);
      }, 500);
});
