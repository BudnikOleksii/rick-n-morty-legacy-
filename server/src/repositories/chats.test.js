const Chat = require('../models/__mocks__/chats');
const { ChatsRepository } = require('./chats');

jest.mock('../models/chats');

const testId = 1;
const testChat = Chat.mockData.find((chat) => chat.id === testId);

describe('getChats', function () {
  it('should return results and total chats count', function () {
    const { results, total } = ChatsRepository.getChats(1, 20);
    expect(results).toStrictEqual(Chat.mockData);
    expect(total).toBe(Chat.mockData.length);
  });
});

describe('getChat', function () {
  it('should return chat find by column name', function () {
    const chat = ChatsRepository.getChat('id', testId);
    expect(chat).toStrictEqual(testChat);
  });
});

describe('getChatById', function () {
  it('should return find by id', function () {
    const chat = ChatsRepository.getChatById(testId);
    expect(chat.mockResults).toStrictEqual(testChat);
  });
});
