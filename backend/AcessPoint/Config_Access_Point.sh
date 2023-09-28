#!/bin/bash

if [ "$(id -u)" != "0" ] ; then
	echo "This script must be run as root"
	exit 1
fi


echo "//////////////////////////////////////////////////////////"
echo "-----------Changing to Acces point  -------------------"
echo "//////////////////////////////////////////////////////////"

echo "/////////////////////////////////////////////////////////////////////"
echo "---Installation des paquets pour la configuration en point d’accès---"
echo "/////////////////////////////////////////////////////////////////////"

apt install hostapd dnsmasq
systemctl unmask hostapd
systemctl enable hostapd


echo "/////////////////////////////////////////////////////////////////////"
echo "--------- Configuration du Raspberry Pi en Point d’Accès  -----------"
echo "/////////////////////////////////////////////////////////////////////"

echo "/////////////////////////////////////////////////////////////////////"
echo "--------------- Creation backup files dans /etc --------------------"
echo "/////////////////////////////////////////////////////////////////////"

# Backup 

cp /etc/wpa_supplicant/wpa_supplicant.conf /etc/wpa_supplicant/wpa_supplicant_orig.conf
cp /etc/dhcpcd.conf /etc/dhcpcd_orig.conf
cp /etc/hostapd/hostapd.conf /etc/hostapd/hostapd_orig.conf
cp /etc/dnsmasq.conf /etc/dnsmasq_orig.conf

echo "//////////////////////////////////////////////////////"
echo "--------------- Modification  files ------------------"
echo "//////////////////////////////////////////////////////"

# Modification 

#Configure wpa_supplicant
cp wpa_supplicant_mod.conf /etc/wpa_supplicant/wpa_supplicant.conf

#Configure dhcpcd
cp dhcpcd_mod.conf /etc/dhcpcd.conf

#configure hostapd

cp hostapd_mod.conf /etc/hostapd/hostapd.conf

#configure dnsmasq

cp dnsmasq_mod.conf /etc/dnsmasq.conf










