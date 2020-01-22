#!/usr/bin/env bash

echo "
----------------------
  Starting server
----------------------
"
cd /opt/backend
sudo pm2 start ./build/server.js
