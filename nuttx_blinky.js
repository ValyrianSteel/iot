var gpio = require("gpio");
var pin = require("stm32f4dis");

gpio.open(pin.PD12);
gpio.write(pin.PD12, "out", "pushpull");
