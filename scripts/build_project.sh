#!/bin/bash

echo "
----------------------
  Building backend
----------------------
"
sudo cp /opt/.env /opt/backend # need to add this to EC2 instance manually
cd /opt/backend && sudo npm install --production
sudo npm run build

echo "
----------------------
  Building frontend
----------------------
"
cd /opt/frontend && sudo npm install
sudo npm run build