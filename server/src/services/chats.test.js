const { BadRequestError, NotFoundError } = require('../utils/errors/api-errors');
const { mockData } = require('../repositories/__mocks__/chats').ChatsRepository;
const { page, limit, incorrectLimit, notFoundId } = require('./__mocks__/mock-data');
const { ChatsService } = require('./chats');
const { ChatsRepository } = require('../repositories/chats');
const { SetsService } = require('./sets');
const { SetsRepository } = require('../repositories/sets');

const { mockChats, mockChat, mockUserId } = mockData;
const endpoint = 'localhost:8080/v1/chats';

jest.mock('../repositories/chats');

describe('getChats', function () {
  it('should not call ChatsRepository.getChats if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(ChatsService.getChats(page, incorrectLimit, endpoint)).rejects.toThrow(
      BadRequestError
    );
    expect(ChatsRepository.getChats).toHaveBeenCalledTimes(0);
  });

  it('should return correct info object and an array of chats', async function () {
    const { info, results } = await ChatsService.getChats(page, limit, endpoint);

    expect(info.total).toBe(mockChats.length);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
    expect(results).toStrictEqual(mockChats);
  });
});

describe('getChat', function () {
  it('should throw NotFoundError if chat not found', async function () {
    expect.assertions(1);

    await expect(ChatsService.getChat('id', notFoundId)).rejects.toThrow(NotFoundError);
  });

  it('should return chat', async function () {
    const chat = await ChatsService.getChat('id', mockChat.id);
    expect(chat).toStrictEqual(mockChat);
  });
});

describe('getChatById', function () {
  it('should throw BadRequestError if incorrect id provided', async function () {
    expect.assertions(2);
    await expect(ChatsService.getChatById('invalid id')).rejects.toThrow(BadRequestError);
    expect(ChatsRepository.getChatById).toHaveBeenCalledTimes(0);
  });

  it('should throw NotFoundError if chat not found', async function () {
    expect.assertions(1);
    await expect(ChatsService.getChatById(notFoundId)).rejects.toThrow(NotFoundError);
  });

  it('should return chat', async function () {
    const chat = await ChatsService.getChatById(mockChat.id);
    expect(chat).toStrictEqual(mockChat);
  });
});

describe('createChat', function () {
  it('should throw BadRequestError and not call ChatsRepository methods if name length < 4', async function () {
    expect.assertions(3);
    await expect(ChatsService.createChat('  a  ')).rejects.toThrow(BadRequestError);
    expect(ChatsRepository.getChat).toHaveBeenCalledTimes(0);
    expect(ChatsRepository.createChat).toHaveBeenCalledTimes(0);
  });

  it('should throw BadRequestError and not call ChatsRepository.createChat if chat with name already exists', async function () {
    expect.assertions(2);
    await expect(ChatsService.createChat(mockChat.name)).rejects.toThrow(BadRequestError);
    expect(ChatsRepository.createChat).toHaveBeenCalledTimes(0);
  });

  it('should return new chat with passed name', async function () {
    const newChatName = 'new set';
    const newChat = await ChatsService.createChat(newChatName);

    expect(newChat.name).toBe(newChatName);
  });
});

describe('getUserChats', function () {
  it('should not call ChatsRepository.getUserChats if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(ChatsService.getUserChats(page, incorrectLimit, endpoint, 1)).rejects.toThrow(
      BadRequestError
    );
    expect(ChatsRepository.getUserChats).toHaveBeenCalledTimes(0);
  });

  it('should return correct info object and an array of chats', async function () {
    const { info, results } = await ChatsService.getUserChats(page, limit, endpoint, 1);

    expect(info.total).toBe(mockChats.length);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
    expect(results).toStrictEqual(mockChats);
  });
});
