# MIA Experiment

Platform for MIA to manage its foreign language learning experiments.

Features:

- Administer multiple experiments concurrently
- UI to create/customize experiments, surveys, data payload (meaning can administer experiments from places other than Anki), etc
- Analyze experiment data across experiments

# Deploy

1. Create file called `setup` in instance root directory
2. Write contents of `install_dependencies.sh` to it
3. `sudo chmod +x setup` && sudo ./setup
4. Configure NGINX for frontend and /api proxy
5. Apply this random PR https://github.com/aws/aws-codedeploy-agent/pull/201
6. Deploy to master normally (AWS CodePipeline takes care of the rest)

# Todo (in order of priority):

- Complete API design and validation (using Joi)
- Authentication (including frontend views based on user roles)
- Continuous deployment pipeline (deploy on every commit/merge to master on Github by cloning the repo)
- Comprehensive test suite
- Admin dashboard (view status of site; ability to edit experiments/surveys/participants/etc)
- Experiment data analytics/visualization
