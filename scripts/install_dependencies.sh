#!/bin/bash
# Note: You jut run this once to setup an EC2 instance environment
# If you had a CD setup where every deploy created fresh/new instances automatically,
# then you would want to have the CD pipeline run this script for you (since you can't do it manually)
echo "
----------------------
  Installing dependencies
----------------------
"
sudo yum update -y
sudo yum install ruby wget -y
sudo yum install httpd
sudo apt-get install ruby wget aws-cli

echo "
----------------------
  Typescript
----------------------
"
sudo npm install -g typescript


echo "
----------------------
  Nodejs/NPM
----------------------
"

# add nodejs 10 ppa (personal package archive) from nodesource
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

# install nodejs and npm
sudo apt-get install -y nodejs

echo "
----------------------
  PM2
----------------------
"

# install pm2 with npm
sudo npm install -g pm2

# set pm2 to start automatically on system startup
sudo pm2 startup systemd


echo "
----------------------
  Nginx
----------------------
"
sudo apt-get install -y nginx


echo "
----------------------
  UFW (FIREWALL)
----------------------
"

# allow ssh connections through firewall
sudo ufw allow OpenSSH

# allow http & https through firewall
sudo ufw allow 'Nginx Full'

# enable firewall
sudo ufw --force enable

echo "
----------------------
  CodeDeploy Agent
----------------------
"
# Dynamically getting the region instead of hard-coding 'us-east-2'
# This way, this .sh file can be used anywhere
REGION=$(curl 169.254.169.254/latest/meta-data/placement/availability-zone/ | sed 's/[a-z]$//')
cd /home/ubuntu
wget https://aws-codedeploy-$REGION.s3.amazonaws.com/latest/install
sudo chmod +x install
sudo ./install auto
