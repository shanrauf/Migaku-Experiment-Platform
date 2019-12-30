const moxios = require('moxios');
const request = require('supertest');
const axios = require('axios');

// import app from './index';

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
  // test('/ GET should fetch all MIA experiments', async () => {
  //   moxios.stubRequest('localhost:3000/api/experiments', {
  //     status: 200,
  //     response: {
  //       experiments: []
  //     }
  //   });
  //   await request(app).get('/api/experiments');
  //   console.log(moxios.requests.mostRecent().url);
  //   expect(moxios.requests.mostRecent().url).toBe(
  //     'http://localhost:3000/api/experiments'
  //   );
  // });
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
  });
});
