#!/usr/bin/env bash

echo "
----------------------
  Stopping server
----------------------
"
cd /opt/backend && sudo pm2 kill
