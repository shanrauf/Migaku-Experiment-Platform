#!/usr/bin/env bash

echo "
----------------------
  Fetching project
----------------------
"

sudo git clone https://github.com/shanrauf/mia-experiment /opt

echo "
----------------------
  Building backend
----------------------
"
# seems like we start in /opt/codedeploy-agent

sudo cp ../.env ../backend
cd ../backend && sudo npm install --production
sudo npm run build

echo "
----------------------
  Building frontend
----------------------
"
cd ../frontend && sudo npm install
sudo npm run build