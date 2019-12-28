#!/bin/bash

echo "
----------------------
  Setting up folder directory
----------------------
"
yum -y update

export app_root=/opt/mia-experiment
if [ -d "$app_root" ];then
    rm -rf /opt/mia-experiment
    mkdir -p /opt/mia-experiment
else
    mkdir -p /opt/mia-experiment
fi
