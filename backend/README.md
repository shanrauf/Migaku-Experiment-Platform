# MIA Experiment

Setup Instructions:

1. `npm install`
2. `npm run setup-dev # This creates the tables and test data on your local SQL server to test the API`
3. 'npm start'

# NOTE

- Error handling is broken for failed queries or Javascript errors
- I have to completely tear down the database and rebuild it when I make insert errors (e.x there are no checks on routes and payloads and model validation)
- Types are okay but could be better

# NPM Commands to Write:

1. Clear all rows from dev tables
2. Drop all tables
