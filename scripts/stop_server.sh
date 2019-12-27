#!/usr/bin/env bash

echo "
----------------------
  Stopping server
----------------------
"
cd ../../../../../../backend && sudo pm2 kill
