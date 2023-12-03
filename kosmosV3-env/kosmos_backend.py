

import numpy as np
from flask_cors import CORS
from flask import Flask,request,make_response
from PIL import Image
import io
import os

from kosmos_main import KState
from kosmos_main import kosmos_main



_myMain=None


app=Flask(__name__)
CORS(app)


def init(myMain):
    global _myMain
    _myMain=myMain
    app.run(host="0.0.0.0",port=5000,debug=False)

    




@app.route("/state")
def index():
    return {
        "status" : "ok",
        "state" : str(_myMain.state)
    }
    
@app.route("/start")
def start():
    if(_myMain.state==KState.STANDBY):   
        _myMain.record_event.set() 
        _myMain.button_event.set()
        return {
            "status" : "ok"
        }
    else :
        return {
            "status" : "error"
        }

@app.route("/stop")
def stop():
    if(_myMain.state==KState.WORKING):
        _myMain.record_event.set()
        _myMain.button_event.set()
        return {
            "status" : "ok"
        }
    else :
        return {
            "status" : "error"
        }
    
@app.route("/changeConfig", methods=['POST'])
def changeConfig():
    if(_myMain.state==KState.STANDBY):
        data = request.json
        for key in data:
            _myMain._conf.set_val(key,data[key])
        _myMain._conf.update_file()
        _myMain.thread_camera.closeCam()
        del _myMain.motorThread
        del _myMain.thread_camera
        _myMain.init()
        _myMain.button_event.set()
        return {
            "status" : "ok"
        }
    else:
        return {
            "status" : "error"
        }
    
    

@app.route("/getConfig")
def getConfig():
    response=dict()
    response["data"]=dict(_myMain._conf.config["KOSMOS"])
    response["status"]="ok"
    return response    
