# Migaku Experiment Platform

Platform for Migaku (previously Mass Immersion Approach, or M.I.A.) to manage foreign language learning experiments.

## Features

- Frontend for experiment participants to register for experiments, complete custom surveys, and view past experiment results
- Backend  enables concurrent experiments, Anki integration to collect/analyze user card collections, and data analysis across experiments/surveys
- Discord integration for authentication (allows for restricting experiment participation to members of the Discord community)

## Selected Media

### High-level MySQL Schema

(excluding many-to-many intermediary tables)

![High-level MySQL schema of experimnet platform](public/experiment_platform.png)

### Audio vs Text Cards Experiment Results

![Audio vs Text Cards Experiment Results](public/audio_vs_text.png)

### MIA Community Census Survey #1

![MIA Community Census Survey](public/census.png)

### Anki Integration Usage Guide (YouTube Video)

[![Watch the video](https://img.youtube.com/vi/707qS5O7BHY/default.jpg)](https://youtu.be/707qS5O7BHY)

## Development Environment Setup

1. `git clone https://github.com/shanrauf/Migaku-Experiment-Platform.git`
2. Ask Shan for .env files
3. Setup MySQL local server is running (see Shan's config [here](public/shan_mysql_config.png))
4. `npm run setup` # Installs dependencies, migrates developemt database, etc

## Develop

To run the frontend or backend cd into the directory, run `npm install` and then `npm start`

## Deploy

Using CodePipeline and CodeDeploy, the code is automatically deployed when you push code to Github.

### How to Setup an EC2 Instance (Ubuntu 16.04 LTS)

1. `cd / && sudo touch install`
2. `sudo nano install` and copy/paste instructions from `scripts/install_dependencies`
3. `sudo chmod u+x install && sudo ./install`
4. `sudo rm /etc/nginx/sites-available/default`
5. `sudo touch /etc/nginx/sites-available/default` and paste contents of `/scripts/default` (frontend static files and /api proxy)
6. `sudo systemctl restart nginx`
7. Manually add `.env` file to `/opt`
8. Push code to master to deploy
