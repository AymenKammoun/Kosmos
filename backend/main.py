from flask import Flask,request
from flask_cors import CORS
from threading import Thread
import RPi.GPIO as GPIO
import time

#con

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


def flaskMain():
    app.run(host="0.0.0.0",port=5000,debug=False)


def main() :
    while(1) :
        print("Kosmod code is runing!")
        time.sleep(5)

t1=Thread(target=main,args=[])
t2=Thread(target=flaskMain,args=[])

t1.start()
t2.start()

