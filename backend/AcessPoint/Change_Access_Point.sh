#!/bin/bash

if [ "$(id -u)" != "0" ] ; then
	echo "This script must be run as root"
	exit 1
fi

echo "//////////////////////////////////////////////////////"
echo "--------------- Activation Service Hostpad -----------"
echo "//////////////////////////////////////////////////////"


systemctl unmask hostapd
systemctl enable hostapd

cp hostapd_mod /etc/default/hostapd

