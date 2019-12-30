import express from 'express';

import loaders from '../../src/loaders';
let app = express();
loaders({ expressApp: app }); // loads "test" sequelize config which is unfinished
export default app;
