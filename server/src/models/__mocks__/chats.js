const MockBaseModel = require('./base-model');
const mockChat = { id: 1 };
const mockChat2 = { id: 2 };

class Chat extends MockBaseModel {}

Chat.mockData = [mockChat, mockChat2];
Chat.mockResults = [mockChat, mockChat2];

module.exports = Chat;
