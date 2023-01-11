const Message = require('../models/__mocks__/messages');
const { MessagesRepository } = require('./messages');

jest.mock('../models/messages');

const testId = 1;
const testMessage = Message.mockData.find((message) => message.id === testId);
const testNewMessage = { body: 'test' };

describe('getChatMessages', function () {
  it('should return results and total chats count', function () {
    const { results, total } = MessagesRepository.getChatMessages(1, 20, Message.mockChatId);
    expect(results).toStrictEqual(Message.mockData);
    expect(total).toBe(Message.mockData.length);
  });
});

describe('getMessageById', function () {
  it('should return query with message find by id', function () {
    const message = MessagesRepository.getMessageById(Message.id);
    expect(message.mockResults).toStrictEqual(testMessage);
  });
});

describe('createMessage', function () {
  it('should return query with new message', function () {
    const message = MessagesRepository.createMessage(testNewMessage);
    expect(message.mockResults.body).toBe(testNewMessage.body);
  });
});

describe('editMessage', function () {
  it('should return query with new message', function () {
    const message = MessagesRepository.editMessage(testId, testMessage.body);
    expect(message.mockResults.body).toBe(testMessage.body);
  });
});

describe('deleteMessage', function () {
  it('should call delete by id', function () {
    MessagesRepository.deleteMessage(Message.id);
    expect(Message.deleteById).toBeCalledWith(Message.id);
  });
});
