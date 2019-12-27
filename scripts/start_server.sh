#!/usr/bin/env bash

echo "
----------------------
  Starting server
----------------------
"
cd ../backend && sudo pm2 start npm -- run start-prod
