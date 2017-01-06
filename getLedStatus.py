import urllib2,json
import RPi.GPIO as GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(13, GPIO.OUT)

while 1:
    results = urllib2.urlopen('https://valyriansteel.github.io/iot/api.json').read()
    status = json.loads(results)['led']
    if status == True:
        GPIO.output(13, GPIO.HIGH)
    else:
        GPIO.output(13, GPIO.LOW)

GPIO.cleanup()
