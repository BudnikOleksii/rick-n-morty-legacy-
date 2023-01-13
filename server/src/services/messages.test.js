const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors/api-errors');
const { MessagesService } = require('./messages');
const { MessagesRepository } = require('../repositories/messages');
const { page, limit, incorrectLimit, notFoundId } = require('./__mocks__/mock-data');
const { mockData } = require('../repositories/__mocks__/messages').MessagesRepository;

const { mockMessageFromDB, mockMessage, mockMessage2 } = mockData;
const messageId = mockMessage.id;
const endpoint = 'localhost:8080/v1/messages';
const messageBody = 'message body';
const adminTokenData = {
  id: mockMessage.user_id,
  roles: [{ id: 1, title: 'admin' }],
};

jest.mock('../repositories/messages');

describe('getChatMessages', function () {
  it('should throw BadRequestError if chat id incorrect', async function () {
    expect.assertions(2);
    await expect(MessagesService.getChatMessages(page, limit, endpoint, 'test')).rejects.toThrow(
      BadRequestError
    );
    expect(MessagesRepository.getChatMessages).toHaveBeenCalledTimes(0);
  });

  it('should throw BadRequestError if limit incorrect', async function () {
    expect.assertions(2);
    await expect(
      MessagesService.getChatMessages(page, incorrectLimit, endpoint, 2)
    ).rejects.toThrow(BadRequestError);
    expect(MessagesRepository.getChatMessages).toHaveBeenCalledTimes(0);
  });

  it('should return correct info object and an array of messages', async function () {
    const { info, results } = await MessagesService.getChatMessages(page, limit, endpoint, 2);

    expect(info.total).toBe(mockMessageFromDB.total);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
    expect(results).toStrictEqual(mockMessageFromDB.results);
  });
});

describe('getLotById', function () {
  it('should throw BadRequestError if incorrect id provided', async function () {
    expect.assertions(2);
    await expect(MessagesService.getMessageById('invalid id')).rejects.toThrow(BadRequestError);
    expect(MessagesRepository.getMessageById).toHaveBeenCalledTimes(0);
  });

  it('should throw NotFoundError if message not found', async function () {
    expect.assertions(1);
    await expect(MessagesService.getMessageById(notFoundId)).rejects.toThrow(NotFoundError);
  });

  it('should return message found by id', async function () {
    const message = await MessagesService.getMessageById(messageId);
    expect(message).toStrictEqual(mockMessage);
  });
});

describe('createMessage', function () {
  it('should return new message', async function () {
    const message = await MessagesService.createMessage(
      mockMessage.chat_id,
      adminTokenData,
      messageBody
    );
    expect(message.body).toStrictEqual(messageBody);
  });
});

describe('editMessage', function () {
  it('should return edited message', async function () {
    const message = await MessagesService.editMessage(mockMessage.id, adminTokenData, messageBody);
    expect(message.body).toBe(messageBody);
  });

  it('should throw ForbiddenError and do not call MessagesRepository.editMessage if it is not your message', async function () {
    expect.assertions(2);
    await expect(
      MessagesService.editMessage(mockMessage2.id, adminTokenData, messageBody)
    ).rejects.toThrow(ForbiddenError);
    expect(MessagesRepository.editMessage).toHaveBeenCalledTimes(0);
  });

  it('should throw BadRequestError and do not call MessagesRepository.editMessage if empty message', async function () {
    expect.assertions(2);
    await expect(MessagesService.editMessage(mockMessage.id, adminTokenData, '')).rejects.toThrow(
      BadRequestError
    );
    expect(MessagesRepository.editMessage).toHaveBeenCalledTimes(0);
  });
});

describe('deleteMessage', function () {
  it('should return 1 if message deleted successfully', async function () {
    const deleted = await MessagesService.deleteMessage(mockMessage.id, adminTokenData);
    expect(deleted).toBe(1);
  });

  it('should throw ForbiddenError and do not call MessagesRepository.editMessage if it is not your message', async function () {
    expect.assertions(2);
    await expect(
      MessagesService.deleteMessage(mockMessage2.id, adminTokenData, messageBody)
    ).rejects.toThrow(ForbiddenError);
    expect(MessagesRepository.deleteMessage).toHaveBeenCalledTimes(0);
  });
});
