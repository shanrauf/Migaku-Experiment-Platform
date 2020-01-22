#!/bin/bash

echo "
----------------------
  Building backend
----------------------
"
sudo cp /opt/.env /opt/backend # need to add this to EC2 instance manually so that cp works

cd /opt/backend
sudo npm install
# sudo npm test
sudo npm run build

echo "
----------------------
  Building frontend
----------------------
"
cd /opt/frontend
sudo npm install
# sudo npm test
sudo npm run build
