#!/usr/bin/env bash

echo "
----------------------
  Setting up dev environment
----------------------
"
cd backend && npm install && npm run setup-dev
cd ../frontend && npm install
