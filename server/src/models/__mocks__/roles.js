const MockBaseModel = require('./base-model');

const mockRole = { id: 1, title: 'user' };

class Message extends MockBaseModel {}

Message.mockData = [mockRole];
Message.mockResults = [mockRole];
Message.mockRole = mockRole;

module.exports = Message;
