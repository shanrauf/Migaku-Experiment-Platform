#!/bin/bash

echo "
----------------------
  Setting up folder directory
----------------------
"

if [ -d "/opt/backend" ];then
    rm -rf /opt/backend
else
    echo "Backend clear"
fi

if [ -d "/opt/frontend" ];then
    rm -rf /opt/frontend
else
    echo "Frontend clear"
fi
