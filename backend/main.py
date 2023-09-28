from flask import Flask,request
from flask_cors import CORS
import RPi.GPIO as GPIO

app=Flask(__name__)
CORS(app)

led1=4
button1=3

GPIO.setmode(GPIO.BCM)
GPIO.setup(led1,GPIO.OUT)
GPIO.setup(button1,GPIO.IN)

@app.route("/")
def index():
    return "Kosmos backend!"

@app.route("/led",methods=['POST'])
def led():
    json=request.json
    state=json["state"]
    GPIO.output(led1,state)
    print(state)
    return {
        "status" : "Ok",
        "ledState": "Led is on" if state else "Led is off"
    }
@app.route("/button",methods=['GET'])
def button():
    state=GPIO.input(button1)
    return {
        "status" : "Ok",
        "buttonState": "Button is pressed" if state else "Button is released"
    }
