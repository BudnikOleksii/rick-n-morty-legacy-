const Chat = require('../models/__mocks__/chats');
const { ChatsRepository } = require('./chats');

jest.mock('../models/chats');

const testId = 1;
const testChat = Chat.mockData.find((chat) => chat.id === testId);
const testUser = { id: 1, username: 'admin' };

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
  it('should return query with chat find by id', function () {
    const chat = ChatsRepository.getChatById(testId);
    expect(chat.mockResults).toStrictEqual(testChat);
  });
});

describe('createChat', function () {
  const newChatName = 'test chat';

  it('should return new chat', function () {
    const chat = ChatsRepository.createChat(newChatName);
    expect(chat.mockResults.name).toStrictEqual(newChatName);
  });
});

describe('addUserToChat', function () {
  it('should relate user to chat', function () {
    ChatsRepository.addUserToChat(Chat, testUser);

    expect(Chat.$relatedQuery).toBeCalledWith('users');
    expect(Chat.relate).toBeCalledWith(testUser);
  });
});

describe('removeUserFromChat', function () {
  it('should unrelate user from chat', function () {
    ChatsRepository.removeUserFromChat(Chat, testUser);

    expect(Chat.$relatedQuery).toBeCalledWith('users');
    expect(Chat.unrelate).toBeCalled();
    expect(Chat.where).toBeCalledWith('id', testUser.id);
  });
});

describe('getUserChats', function () {
  it('should chat where current user exists', function () {
    const { results, total } = ChatsRepository.getUserChats(1, 20, testUser.id);
    expect(results).toStrictEqual(Chat.mockData);
    expect(total).toBe(Chat.mockData.length);
  });
});
