const MockBaseModel = require('./base-model');

const mockToken = { id: 1, refresh_token: 'refresh_token' };

class Token extends MockBaseModel {}

Token.mockData = [mockToken];
Token.mockResults = [mockToken];
Token.mockToken = mockToken;

module.exports = Token;
