from flask import Flask,request
from flask_cors import CORS
#import Rpi.GPIO as GPIO

app=Flask(__name__)
CORS(app)

#led=4

#GPIO.setmode(GPIO.BCM)
#GPIO.setup(led,GPIO.OUT)

@app.route("/")
def index():
    return "Kosmos backend!"

@app.post("/led")
def led():
    json=request.json
    state=json["state"]
    #GPIO.output(led,state)
    print(json)
    return {
        "status" : "Ok",
        "ledState": "Led is on" if state else "Led is off"
    }
