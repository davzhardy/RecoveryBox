const { getUserInfo } = require ('../controller');
const db = require('../models/index');
const { mockRequest, mockResponse } = require('../util/testUtils/interceptor');
const { mockGetUserInfoResponse } = require('../util/testUtils/mockDbResponses/mockDbResponses');

jest.mock('../models/index');

//TODO: will need to implement a 404 test on the router if no params to this route
describe("getUserInfo controller function", () => {
  test("should 200 and return all data for a specific user from the DB", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockDbResponse = mockGetUserInfoResponse;
    req.params.username = 'Raph';
    db.User.findAll.mockResolvedValue(mockDbResponse);

    const response = await getUserInfo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send.mock.calls.length).toBe(1);
    expect(res.send).toHaveBeenCalledWith(mockDbResponse);
  });
});



