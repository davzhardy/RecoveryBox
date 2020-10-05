// util/interceptor.js

// const mockRequest = {
//   params: {},
// };

module.exports = {
    mockRequest: () => {
      const req = {}
      req.body = jest.fn().mockReturnValue(req)
      req.params = jest.fn().mockReturnValue(req)
      return req
    },
    // mockRequest,

    mockResponse: () => {
      const res = {}
      res.send = jest.fn().mockReturnValue(res)
      res.status = jest.fn().mockReturnValue(res)
      res.json = jest.fn().mockReturnValue(res)
      return res
    },
    // mockNext: () => jest.fn()
  }