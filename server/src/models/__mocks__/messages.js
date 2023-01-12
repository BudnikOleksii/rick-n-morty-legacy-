const MockBaseModel = require('./base-model');
const mockChatId = 5;
const mockMessage = { id: 1, chat_id: mockChatId };
const mockMessage2 = { id: 2, chat_id: mockChatId };

class Message extends MockBaseModel {}

Message.mockData = [mockMessage, mockMessage2];
Message.mockResults = [mockMessage, mockMessage2];
Message.mockChatId = mockChatId;

module.exports = Message;
