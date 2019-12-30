import express from 'express';

import expressLoader from '../../src/loaders/express';

export const initExpress = () => {
  return expressLoader({ app: express() });
};
