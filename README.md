# MIA Experiment

Platform for MIA to manage its foreign language learning experiments.

Features:

- Administer multiple experiments concurrently
- Admin UI to create/customize experiments, surveys, data payload, etc
- Analyze experiment data across experiments

## Development Environment Setup

1. `git clone https://github.com/shanrauf/mia-experiment.git`
2. Ask Shan for .env files
3. Ensure MySQL local server is running (see Shan's config [here](https://gyazo.com/1ea29a7b388c8b86dc9fc6ef9d455423))
4. `npm run setup` # Installs dependencies, migrates developemt database, etc

## Develop

To run the frontend or backend cd into the directory and run `npm start`

## Deploy

Using CodePipeline and CodeDeploy, the code is automatically deployed when you push code to Github.

### Setup an EC2 instance

1. Add `install_dependencies.sh` and `server.conf` to root directory of instance
2. `sudo chmod u+x install_dependencies.sh && sudo ./install_dependencies.sh` # Installs global dependencies (Nodejs, Nginx, CodeDeploy-Agent, etc)
3. `sudo rm /etc/nginx/sites-available/default`
4. `sudo touch /etc/nginx/sites-available/default`
5. Add contents of local `/scripts/default` to clipboard (frontend static files and /api proxy)
6. Paste content into `sudo nano /etc/nginx/sites-available/default`, then Ctrl + X to save
7. `sudo systemctl restart nginx`
8. Manually add `.env` file to `/opt`
9. Push code to master to deploy

## Todo (in order of priority)

- Move dev dependencies out of dependencies in package.json and only install required dependencies on deploy...
- Complete basic test suite that covers all API routes (testing status codes, response bodies, and model validation)
- Secure API (currently, anyone can make any request from anywhere) via authentication (add auth cases to unit tests)
- Significantly improve frontend styling
- Complete basic e2e test suite through the frontend (i.e filling out form inputs, etc)
- Devise system to send error msgs for frontend to display (e.x backend shud return "survey alreadysubmitted" msg for frontend notif to display)
- Admin dashboard (view status of site; ability to edit experiments/surveys/participants/etc)
- Experiment data analytics/visualization
