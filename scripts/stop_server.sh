#!/usr/bin/env bash

echo "
----------------------
  Stopping server
----------------------
"
cd ~ && sudo pm2 kill
