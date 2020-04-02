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

1. `cd / && sudo touch install`
2. Copy install_dependencies.sh into `sudo nano install`
3. Installs global dependencies (Nodejs, Nginx, CodeDeploy-Agent, etc)

```
cd /
sudo chmod u+x install
sudo ./install
```

3. `sudo rm /etc/nginx/sites-available/default`
4. `sudo touch /etc/nginx/sites-available/default`
5. Add contents of local `/scripts/default` to clipboard (frontend static files and /api proxy)
6. Paste content into `sudo nano /etc/nginx/sites-available/default`, then Ctrl + X to save
7. `sudo systemctl restart nginx`
8. Manually add `.env` file to `/opt`
9. Push code to master to deploy

## Todo (in order of priority)

## Backend

- Improve db schema
- Create stateless auth implementation (prompt=none discord oauth?)
- Add Google auth
- Protect admin routes
- Refactor queries to allow for admin vs. user querying (e.x public experiments only when user)
- Cleaner way to compose db calls and wrap them in transactions
- API rate limiting
- Secure API (currently, anyone can make any request from anywhere) via authentication (add auth cases to unit tests)
- Discord message confirming survey, rewards, etc; email if not in MIA Discord (wrap this busLogic in onSurveySubmitted event)
- Complete basic test suite that covers all API routes (testing status codes, response bodies, and model validation)
- Refactor towards DDD architecture (validation, separate by domain, etc)
- Improve logging
- Create way for external services to test API (e.x route for Anki to test submitting a survey - no conncetion to database, just test validation, etc)

### Frontend

- Make landing page static
- Clear old architecture (e.x global store survey/experiments modules), add new architecture
  <!-- - Implement new stateless auth -->
- Rewrite survey feature (% breakdown question, reduce survey q's; validation, cleaner, separate rules, pagination, save answers in local storage until submission, api calls for survey questions/sections)
- Admin panel (data visualization; experiments/surveys/participants/questions CRUD)
- Significantly improve frontend styling
- Devise system to send error msgs for frontend to display (e.x backend shud return "survey alreadysubmitted" msg for frontend notif to display)
- Create e2e test suite through the frontend (i.e filling out form inputs, etc)
- Create unit/integration tests

### Deployment

- Move dev dependencies out of dependencies in package.json and only install required dependencies on deploy... (keep in mind deps needed to compile & start server)
- See if can run tests and compile code before deployment for free (i.e without AWS CodeBuild)
- Cron job to renew Let's Encrypt certificates and restart Nginx with zero downtime
- Run Node.js server in clusters, have Nginx reverse proxy redirect to them with zero downtime
- Serve frontend files from a CDN that can be pushed to during deployment to still allow CI/CD (CloudFlare?)
- Create system tests (ensure deployment was successful via /health endpoints, etc)
- Blue/Green deployments
- A//B Testing
- Define indexes on MySQL database and MongoDB database (recommended by `agenda` and best practices)

### Post-Release

- Clean Git history
- Create flexible system to create experiment results pages (similar to article dynamic content); perhaps even prerender them
