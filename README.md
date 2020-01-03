# MIA Experiment

Platform for MIA to manage its foreign language learning experiments.

Features:

- Administer multiple experiments concurrently
- UI to create/customize experiments, surveys, data payload (i.e experiment data can come from places other than Anki or surveys), etc
- Analyze experiment data across experiments

# Development Environment Setup

1. git clone https://github.com/shanrauf/mia-experiment.git
2. ./scripts/setup_dev.sh # This makes Git run unit tests before allowing you to commit code
3. Ensure MySQL local server is running (necessary for development and testing)

# Deploy

Using CodePipeline and CodeDeploy, the code is automatically deployed when you push code to Github.

# Setup an EC2 instance

1. Add `install_dependencies.sh` to root directory of instance
2. `sudo ./install_dependencies.sh` # Installs nodejs, codedeploy-agent, etc
3. Replace `/etc/nginx/sites-available/default` content with `/scripts/default`(for frontend static files and /api proxy)
4. Push code to master to deploy

# Todo (in order of priority):

- Complete API design (and add to unit tests)
- Complete basic test suite that covers all API routes
- Authentication (including frontend views based on user roles)
- Add API validation (using Joi and/or Typescript type guards)
- Secure API (currently, anyone can make any request from anywhere) via authentication (add auth cases to unit tests)
- Significantly improve frontend styling
- Devise system to send error msgs for frontend to display (e.x backend shud return "survey alreadysubmitted" msg for frontend notif to display)
- Admin dashboard (view status of site; ability to edit experiments/surveys/participants/etc)
- Experiment data analytics/visualization
- Comprehensive test suite
