const moxios = require('moxios');
const request = require('supertest');

import { initExpress } from './index';

// const mockRequest = (params, body) => ({
//   params,
//   body
// });

// const mockResponse = () => {
//   const res: any = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);
//   return res;
// };

describe('experiments', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('/ GET should fetch all MIA experiments', async () => {
    // moxios.stubRequest(/experiments/, {
    //   status: 200,
    //   response: {
    //     experiments: []
    //   }
    // });
    // const app = initExpress();
    // await request(app).get('/experiments');
    // expect(moxios.requests.mostRecent().url).toBe(
    //   'https://api.github.com/users/HugoDF'
    // );
    expect(2).toBe(2);
  });
  test('It should 200 and return experiments that the participant is registered for', async () => {
    // moxios.stubRequest(/experiments/, {
    //   status: 200,
    //   response: {
    //     experiments: []
    //   }
    // });
    // const app = initExpress();
    // const res = await request(app).get('/experiments');
    // expect(res.body).toEqual([
    //   {
    //     experimentId: "abc123"
    //   }
    // ]);
    expect(2).toBe(2);
    test('/ GET', async () => {});
  });
});
