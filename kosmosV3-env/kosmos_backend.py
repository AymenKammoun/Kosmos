import numpy as np
from flask_cors import CORS
from flask import Flask,request,make_response
from PIL import Image
import io
import os

from komos_state import KState

class Server:
    
    app = Flask(__name__)
    def __init__(self,myMain):
        self.myMain=myMain
        CORS(self.app)
        
        self.app.add_url_rule("/state", view_func=self.state)
        self.app.add_url_rule("/start", view_func=self.start)
        self.app.add_url_rule("/stop", view_func=self.stop)
        self.app.add_url_rule("/getRecords", view_func=self.getRecords)
        self.app.add_url_rule("/changeConfig", view_func=self.changeConfig,methods=['POST'])
        self.app.add_url_rule("/getConfig", view_func=self.getConfig)
        self.app.add_url_rule("/frame", view_func=self.image)
    
    def run(self) :
        print("server is running !")
        self.app.run(host="0.0.0.0",port=5000,debug=False)
    
    def state(self):
        return {
            "status" : "ok",
            "state" : str(self.myMain.state)
        }
        
    def start(self):
        if(self.myMain.state==KState.STANDBY):   
            self.myMain.record_event.set() 
            self.myMain.button_event.set()
            return {
                "status" : "ok"
            }
        else :
            return {
                "status" : "error"
            }

    def stop(self):
        if(self.myMain.state==KState.WORKING):
            self.myMain.record_event.set()
            self.myMain.button_event.set()
            return {
                "status" : "ok"
            }
        else :
            return {
                "status" : "error"
            }
    
    def changeConfig(self):
        if(self.myMain.state==KState.STANDBY):
            data = request.json
            for key in data:
                self.myMain._conf.set_val(key,data[key])
            self.myMain._conf.update_file()
            self.myMain.thread_camera.closeCam()
            del self.myMain.motorThread
            del self.myMain.thread_camera
            self.myMain.init()
            self.myMain.button_event.set()
            return {
                "status" : "ok"
            }
        else:
            return {
                "status" : "error"
            }

    def getConfig(self):
        response=dict()
        response["data"]=dict(self.myMain._conf.config["KOSMOS"])
        response["status"]="ok"
        return response  

    def getRecords(self):
        response=dict()
        stream =os.popen('ls -l /media/kosmos/kosmoscle3/Video')
        streamOutput = stream.read()
        listTemp = streamOutput.split('-rwxrwxrwx ')[1:]
        outputList=[]
        for e in listTemp:
            d=dict()
            data=e.split()
            d["size"]="{:.4f}".format(int(data[3])/(1024**2))
            d["month"]=data[4]
            d["day"]=data[5]
            d["time"]=data[6]
            d["fileName"]=data[7]
            outputList.append(d)
        response["data"]=outputList
        response["status"]="ok"
        return response

    def image(self):
        camera=self.myMain.thread_camera._camera
        camera.resolution=(320,240)
        shape=(camera.resolution[1],camera.resolution[0],3)
        frame=np.empty(shape,dtype=np.uint8)
        camera.capture(frame,'rgb')
        camera.resolution = (self.myMain.thread_camera._X_RESOLUTION, self.myMain.thread_camera._Y_RESOLUTION)
        image=Image.fromarray(frame)
        buf=io.BytesIO()
        image.save(buf,format='jpeg')
        response=make_response(buf.getvalue())
        response.headers['Content-Type']='image/jpg'
        return response    
