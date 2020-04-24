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

- Read http://thecodebarbarian.com/node.js-task-scheduling-with-agenda-and-mongodb.html

- (in parallel) Outline business use cases
- Put backend in Docker container (worry about CD later)

- (ongoing) Refactor towards DDD architecture (validation, separate by domain, etc)
- Create stateless auth implementation (prompt=none discord oauth?)
- Add Google auth
- Add "MIA Account auth" via Auth0
- Improve db schema & migrate data
- Define indexes on MySQL database and MongoDB database (recommended by `agenda` and best practices)
- Revise API route structure if you'd like or need to
- Discord message confirming survey, rewards, etc; email if not in MIA Discord (wrap this busLogic in onSurveySubmitted event)
- Complete basic test suite that covers all API routes (testing status codes, response bodies, and model validation)
- Improve logging for APM
- Create way for external services to test API (e.x route for to test submitting data for an experiment - no db connection, just test validation, etc)
- Experiment dashboard (experiments/surveys/participants/questions CRUD; rewrite analytics implementation)
- Setup MongoDB Docker container (for Agenda job scheduling)
- Setup a message queue for scheduling agenda jobs? e.x if i want to edit a job to emial about survey release, i hve to delete the old job & create new one w new date, but that might fail, and a message queue is only way to ensure job fully completes...
- Create Discord service (either sep domain folder, or separate project/microservice, up to you; see doc)
- Experiment dashboard agenda task scheduling (e.x schedule Discord msg to ppl missing role x asking to do something, schedule Discord announcements, kick inactive experiment participants periodically, etc)
- Look into Amazon API Gateway, Varnish, etc
- Look into AWS Amplify, Elastic Beanstalk, how to manage dev & production secret keys
- Run Node.js server in clusters, have Nginx reverse proxy redirect to them with zero downtime
- Move dev dependencies out of dependencies in package.json and only install required dependencies on deploy... (keep in mind deps needed to compile & start server)
- See if can run tests and compile code before deployment for free (unless AWS CodeBuild is free)
- Streamline production deployment with Docker, improved CodePipeline config, renew Let's Encrypt certificates and restart Nginx with zero downtime, etc
- Streamline dev environment setup accordingly
- Serve frontend files from a CDN that can be pushed to during deployment to still allow CI/CD (CloudFlare?)

## Frontend

- Clear old architecture (e.x global store survey/experiments modules), add new architecture
- Implement frontend auth
- Admin panel (data visualization)
- Rewrite survey feature (% breakdown question, Other option on selects w/ text input (w/ rules?), way to manage items (sql table prob), reduce survey q's; validation, cleaner, separate rules, pagination, save answers in local storage until submission, api calls for survey questions/sections, mention to answer for specific TL)
- Make landing page static
- Significantly improve frontend styling
- Devise system to send error msgs for frontend to display (e.x backend shud return "survey alreadysubmitted" msg for frontend notif to display)
- Create e2e test suite through the frontend (i.e filling out form inputs, etc)
- Create unit/integration tests

* Create system tests (ensure deployment was successful via /health endpoints, etc)

### Post-Release

- Clean Git history
- Create flexible system to compose and prerender experiment results pages (similar to article dynamic content composition)
