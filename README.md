# Kosmos software v2
## Description du projet
Ce projet est une branche du repository **KOSMOS_SOFTWARE** du **KonkArLab** qui ajoute une deusiéme alternative du commande de la camera Kosmos : La controle par les interrepteurs reed reste fonctionelle. On ajoute à ça une application web qui fait les memes chose que les interrepteurs et on ajoutant au memes temps d'autres fonctionnalités.
On peut résumé tous les fonctionnalité de l'application web par ce qui suit :
-   Activer ou désactiver l'enregistrement.
-   Voir le camera en flux direct avant l'enregistrement.
-   Consulter l'etat du système.
-   Configurer et consulter les paramétres du camera.
-   Consulter les derinier enregistrement.
## Description de la partie Backend
### Technologie utiliser
Vue que le software de base est développer par la language Python, On a décidé d'utiliser Flask qui est un micro framework open-source de développent web en Python. Il est classé comme microframework car il est très léger. Flask a pour objectif de garder un noyau simple mais extensible.

### Description des API
-   GET /state :
    Cette requette retourne l'état du systéme
    #### Exemple de réponse :
    ```json
    {
        "state": "KState.STANDBY",
        "status": "ok"
    }
    ```

    #### Implémentation
    ```python
    def state(self):
        return {
            "status" : "ok",
            "state" : str(self.myMain.state)
        }
    ```
-   GET /start :
    Cette requette demarre l'enregistrement.
    #### Exemple de réponse :
    ```json
    {
        "status": "ok"
    }
    ```

    #### Implémentation
    ```python
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
    ```

    -   GET /stop :
    Cette requette arrete l'enregistrement.
    #### Exemple de réponse :
    ```json
    {
        "status": "ok"
    }
    ```

    #### Implémentation
    ```python
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
    ```

    -   POST /changeConfig :
    Cette requette change la configuration.

    #### Exemple de body requete :
    ```json
    {
        "sett_video_file_name" : "testFileName"
    }
    ```

    #### Exemple de réponse :
    ```json
    {
        "status": "ok"
    }
    ```

    #### Implémentation
    ```python
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
    ```

    -   GET /getConfig :
    Cette requette retourne toute la configuration actuelle.
    #### Exemple de réponse :
    ```json
    {
        "data": {
            "sett_csv_file_name": "Kosmos_CSV",
            "sett_csv_step_time": "5",
            "sett_esc_motor_favorite_val": "1350",
            "sett_esc_motor_gpio": "22",
            "sett_esc_motor_max_val": "2100",
            "sett_esc_motor_min_val": "1000",
            "sett_framerate": "24",
            "sett_led_b": "4",
            "sett_led_r": "18",
            "sett_mode": "1",
            "sett_motor_button_gpio": "21",
            "sett_motor_run_time": "5",
            "sett_motor_stop_time": "27",
            "sett_power_motor_gpio": "27",
            "sett_record_button_gpio": "17",
            "sett_record_time": "400",
            "sett_shutdown": "1",
            "sett_stop_button_gpio": "23",
            "sett_video_file_name": "test2",
            "sett_video_preview": "0",
            "sett_video_resolution_x": "1920",
            "sett_video_resolution_y": "1080"
        },
        "status": "ok"
    }
    ```

    #### Implémentation
    ```python
    def getConfig(self):
        response=dict()
        response["data"]=dict(self.myMain._conf.config["KOSMOS"])
        response["status"]="ok"
        return response  
    ```

    -   GET /getRecord :
    Cette requette retourne des informations sur les derinier enregistrement.
    #### Exemple de réponse :
    ```json
    {
        "data": [
            {
                "day": "9",
                "fileName": "test2_2023-12-09-16-25-48.h264",
                "month": "Dec",
                "size": "240.4268",
                "time": "16:32"
            },
            {
                "day": "9",
                "fileName": "test2_2023-12-09-16-26-07.h264",
                "month": "Dec",
                "size": "9.1890",
                "time": "16:26"
            },
            {
                "day": "9",
                "fileName": "test2_2023-12-09-16-27-46.h264",
                "month": "Dec",
                "size": "96.3208",
                "time": "16:29"
            }
        ],
        "status": "ok"
    }
    ```

    #### Implémentation
    ```python
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
    ```


    -   GET /image :
    Cette requette retourne une image JPG issu de la camera au moment du requete.
    #### Exemple de réponse :
    (exmple d'image aprés)

    #### Implémentation
    ```python
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
    ```