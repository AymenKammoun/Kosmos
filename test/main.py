import configparser
from flask_cors import CORS
from flask import Flask,request,make_response

app=Flask(__name__)
CORS(app)

config = configparser.ConfigParser()
config.read("config.ini")

@app.route("/getConfig")
def getInit():
    response=dict()
    response["data"]=dict(config["kosmos"])
    response["status"]="ok"
    return response

@app.route("/changeConfig", methods=['POST'])
def changeConfig():
    data = request.json
    for key in data:
        config.set("kosmos",key,str(data[key]))

    with open("config.ini", 'w') as configfile:
        config.write(configfile)
    return {
            "status" : "ok"
        }

app.run(host="0.0.0.0",port=5000,debug=False)