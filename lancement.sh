#!/bin/bash
sleep 20

#Deplacement du fichier kosmos_config.ini dans la cle USB
#sudo cp -n /home/kosmos/kosmos_software/kosmos_config.ini /media/kosmos/kosmoscle3
cd /home/kosmos/kosmos_software/frontend
sudo python3 -m http.server 80 &

#Lance kosmos_main.py 
cd /home/kosmos/kosmos_software/kosmosV3-env
sudo python3 kosmos_main.py

