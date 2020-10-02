const { getUserInfo } = require ('../controller');
const db = require('../models/index');

jest.mock('../models/index');

const mockResponse = [
  {
      "id": 5412,
      "username": "Raph",
      "email": "raphael@codeworks.com",
      "password": "password",
      "firstName": "Raphael",
      "lastName": "Mazet",
      "registrationDate": "1601576812578",
      "createdAt": "2017-08-19T16:17:55.000Z",
      "updatedAt": "2017-08-19T16:17:55.000Z",
      "Data": [
          {
              "id": 1,
              "date": 400000,
              "meetings": 5,
              "feeling": 7,
              "moods": "[\"tired\", \"happy\", \"sad\"]",
              "suggestions": "[\"Prayer\", \"Meditation\", \"Useful\", \"Kind to Myself\"]",
              "createdAt": "2017-08-19T16:17:55.000Z",
              "updatedAt": "2017-08-19T16:17:55.000Z",
              "UserId": 5412
          }
      ]
  }
]

describe("getUserInfo controller function", () => {
  test("it returns all data for a specific user", async () => {
    db.User.findAll.mockResolved(mockResponse);
    
    const userData = await getUserInfo();
    expect(userData).toEqual(mockResponse);
  });
});