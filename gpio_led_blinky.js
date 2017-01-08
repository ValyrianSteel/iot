var assert = require('assert');
var gpio = require("gpio");

// mode : pullup (on-low, off-high), pulldn, float, pushpull, opendrain
var LED_PIN_NUMBER = 27,
    LED_PIN_MODE = "pushpull";

var LED_ON = true,
    LED_OFF = false;

var count = 0;

gpio.initialize();

gpio.on('initialize', function() {
  console.log('GPIO initialized');

  gpio.open(LED_PIN_NUMBER, "out", LED_PIN_MODE);
});

gpio.on('open', function(pin, dir, mode) {
  console.log('open complete - pin: %d, direction: %s, mode: %s',
              pin, dir, mode);
  
if (pin === LED_PIN_NUMBER) {
    gpio.write(pin, LED_ON, function(err) {
      console.log('write complete - pin: %d, value: %d', pin, LED_ON);
    });

    setTimeout(function() {
      gpio.write(pin, LED_OFF, function(err) {
        console.log('write complete - pin: %d, value: %d', pin, LED_OFF);
      });
    }, 2000);
  }

});

gpio.on('write', function(pin, writeValue) {
  console.log('write event - pin: %d, value: %d', pin, writeValue);

  gpio.read(pin, function(err, readValue) {
    assert.equal(writeValue, readValue);
    console.log('read complete - pin: %d, value: %d', pin, readValue);
  });
});

gpio.on('read', function(pin, value) {
  console.log('read event - pin: %d, value: %d', pin, value);

  // read function is called two times.
  if ((++count) === 2) {
    // release gpio after 1000ms
    setTimeout(function() {
      gpio.release();
    }, 1000);
  }
});

gpio.on('release', function() {
  console.log('released');
});

gpio.on('error', function(err) {
  console.log(err);
});

