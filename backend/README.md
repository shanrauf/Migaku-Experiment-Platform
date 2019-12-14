# MIA Experiment

Setup Instructions:

1. `npm install`
2. `npm run setup-dev # This creates the tables and test data on your local SQL server to test the API`
3. 'npm start'

# NOTE

- Error handling is broken for failed queries or Javascript errors
- I have to completely tear down the database and rebuild it when I make insert errors (e.x if I want to create a survey for an experiment, I create Survey, then go to create ExperimentSurvey, but if I haven't created experiment, it crashes even though it created the survey. In other words, there are no checks on routes and payloads (which I'll prob use Celebrate/Joi for))
- Types are really messy; I just add them to make the errors go away

# NPM Commands to Write:

1. Fix seeders... (issue is that foreign keys are referenced b4 that table w the foreign key even exists)
2. Clear all rows from dev tables
3. Drop all tables
