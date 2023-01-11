const MockBaseModel = require('./base-model');
const mockMessage = { id: 1 };
const mockMessage2 = { id: 2 };

class Message extends MockBaseModel {}

Message.mockData = [mockMessage, mockMessage2];
Message.mockResults = [mockMessage, mockMessage2];

module.exports = Message;
