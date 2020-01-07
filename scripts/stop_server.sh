#!/usr/bin/env bash

echo "
----------------------
  Stopping server
----------------------
"
cd ~ && pm2 kill
