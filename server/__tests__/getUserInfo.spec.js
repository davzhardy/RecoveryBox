const { getUserInfo } = require ('../controller');
const db = require('../models/index');
const { mockRequest, mockResponse } = require('../util/interceptor');

jest.mock('../models/index');

const mockDbResponse = 'mockDbResponse';

//TODO: will need to implement a 404 test on the router if no params to this route
describe("getUserInfo controller function", () => {
  test("should 200 and return all data for a specific user from the DB", async () => {
    let req = mockRequest();
    req.params.username = 'Raph';
    db.User.findAll.mockResolvedValue(mockDbResponse);
    const res = mockResponse();

    await getUserInfo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(mockDbResponse);
  });
});



