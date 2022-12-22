const { ChatsRepository } = require('../repositories/chats');
const { checkNameLength } = require('../utils/check-name-length');
const { BadRequestError, NotFoundError } = require('../utils/errors/api-errors');
const { UserService } = require('./users');
const { checkId } = require('../utils/check-id');
const { checkLimitForRequest } = require('../utils/check-limit-for-request');
const { createInfoData } = require('../utils/create-info-data');

const getChats = async (page, limit, endpoint) => {
  checkLimitForRequest(limit, 'chats');
  const { results, total } = await ChatsRepository.getChats(page, limit);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

const getChat = async (columnName, value) => {
  const chat = await ChatsRepository.getChat(columnName, value);

  if (!chat) {
    throw new NotFoundError(['Chat not found']);
  }

  return chat;
};

const getChatById = async (id) => {
  checkId(id);

  const chat = await ChatsRepository.getChatById(id);

  if (!chat) {
    throw new NotFoundError(['Chat not found']);
  }

  return chat;
};

const createChat = async (name) => {
  checkNameLength(name);

  const candidate = await ChatsRepository.getChat('name', name);

  if (candidate) {
    throw new BadRequestError(['Current chat already exists']);
  }

  return ChatsRepository.createChat(name);
};

const toggleUserInChat = async (chatId, userId) => {
  const chat = await getChat('id', chatId);
  const user = await UserService.getUserChats(userId);
  const isUserHaveExistingChat = user.chats.some((chat) => chat.id === Number(chatId));

  if (isUserHaveExistingChat) {
    return ChatsRepository.removeUserFromChat(chat, user);
  }

  return ChatsRepository.addUserToChat(chat, user);
};

const getUserChats = async (page, limit, endpoint, userId) => {
  checkLimitForRequest(limit, 'chats');
  const { results, total } = await ChatsRepository.getUserChats(page, limit, userId);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

module.exports.ChatsService = {
  getChats,
  getChatById,
  createChat,
  toggleUserInChat,
  getUserChats,
};
