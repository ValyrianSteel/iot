var led_green = 0;
var led_orange = 1;
var led_red = 2;
var led_blue = 3;

var leds = new Array (led_green, led_orange, led_red, led_blue);
var numOfIterations = 10;

var LED_ON = true,
    LED_OFF = false;
var LED_PIN_MODE = "pushpull";

gpio.initialize();
gpio.on('initialize', function() {
    for ( var i = 0; i < leds.length; i++)
    {
        gpio.open(leds[i], "out", LED_PIN_MODE);
    }
});


  for (var j = 0; j < numOfIterations; j += 1)
  {
      for ( var led = 0; led < leds.length; led++)
      {
      gpio.on('open', function() {
          gpio.write(leds[led], LED_ON);
      });
      setTimeout(function() {
          gpio.write(leds[led], LED_OFF);
      }, 500);
      }
  }
