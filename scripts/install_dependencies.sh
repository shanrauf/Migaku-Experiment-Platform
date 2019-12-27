#!/usr/bin/env bash
# Note: You really just need to run this once in an instance... otherwise this is unnecessary
echo "
----------------------
  Installing dependencies
----------------------
"

# Dynamically getting the region instead of hard-coding 'us-east-2'
# This way, this .sh file can be used anywhere
REGION=$(curl 169.254.169.254/latest/meta-data/placement/availability-zone/ | sed 's/[a-z]$//')
sudo npm install -g typescript
sudo yum update -y
sudo yum install ruby wget -y
sudo yum install httpd
sudo apt-get install ruby wget
curl https://gist.githubusercontent.com/cornflourblue/f0abd30f47d96d6ff127fe8a9e5bbd9f/raw/e3047c9dc3ce8b796e7354c92d2c47ce61981d2f/setup-nodejs-mongodb-production-server-on-ubuntu-1804.sh | sudo bash
cd /home/ubuntu
wget https://aws-codedeploy-$REGION.s3.amazonaws.com/latest/install
sudo chmod +x install
sudo ./install auto
