# MIA Experiment

Platform for MIA to manage its foreign language learning experiments.

Features:

- Administer multiple experiments concurrently
- UI to create/customize experiments and surveys within experiments
- Analyze data across experiments

# Deploy

1. npm run build in /frontend and /backend
2. Copy /frontend and /backend folders into /home/ubuntu (exclude node_modules, include .env files)
3. `cp -i -r /home/ubuntu/backend /opt` && `cp -i -r /home/ubuntu/frontend /opt`
4. In /opt/backend: `sudo npm install --production` && `sudo pm2 start npm -- run start-prod`
