# MIA Experiment

Setup Instructions:

1. `npm install`
2. `npm run force-sync-dev # This creates the tables on your local SQL server`
3. 'npm run seed # This will create dummy entries in the table to test the API with'
4. 'npm start'

# NPM Commands to Write:

1. Fix seeders... (issue is that foreign keys are referenced b4 that table w the foreign key even exists)
2. Clear all rows from dev tables
3. Drop all tables
