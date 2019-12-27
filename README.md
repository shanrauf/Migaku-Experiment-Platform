# MIA Experiment

Platform for MIA to manage its foreign language learning experiments.

Features:

- Administer multiple experiments concurrently
- UI to create/customize experiments, surveys, data payload (meaning can administer experiments from places other than Anki), etc
- Analyze experiment data across experiments

# Deploy

1. `npm run build in /frontend and /backend`
2. Copy `/frontend` and `/backend` folders into `/home/ubuntu` (exclude node_modules, include .env files)
3. `cp -i -r /home/ubuntu/backend /opt` && `cp -i -r /home/ubuntu/frontend /opt` # The reaosn for such a tedious process is because I don't have write access through FileZilla to just drag/drop... So I have to use cp when connnecting to the instance with ssh
4. In /opt/backend: `sudo npm install --production` && `sudo pm2 start npm -- run start-prod`
