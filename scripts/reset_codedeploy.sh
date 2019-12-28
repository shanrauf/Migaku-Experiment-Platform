#!/bin/bash
echo "
----------------------
  Deleting codedeploy
----------------------
"
# Assuming you already killed the codedeploy-agent processes by doing:
# ps aux
# sudo kill -9 PIdOfCodeDeployAgent && sudo kill -9 PIdOfOtherCodeDeployAgent
sudo dpkg --purge codedeploy-agent
rm -rf /opt/codedeploy-agent # Just to ensure it dies...
echo "
----------------------
  Reinstalling codedeploy
----------------------
"
REGION=$(curl 169.254.169.254/latest/meta-data/placement/availability-zone/ | sed 's/[a-z]$//')
sudo apt-get install ruby wget
cd /home/ubuntu
wget https://aws-codedeploy-$REGION.s3.amazonaws.com/latest/install
sudo chmod +x install
sudo ./install auto
