const httpStatusCodes = require('../utils/http-status-codes');
const { ChatsService } = require('../services/chats');
const config = require('../../config');

const { defaultPage, defaultLimitPerPage } = config.server;

const getChats = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;
  const endpoint = req.headers.host + req.baseUrl;

  try {
    const chatsData = await ChatsService.getChats(page, limit, endpoint);

    return res.status(httpStatusCodes.OK).json(chatsData);
  } catch (error) {
    next(error);
  }
};

const getChat = async (req, res, next) => {
  const { id } = req.params;

  try {
    const chatData = await ChatsService.getChatById(id);

    return res.status(httpStatusCodes.OK).json(chatData);
  } catch (error) {
    next(error);
  }
};

const createChat = async (req, res, next) => {
  const { name } = req.body;

  try {
    const chatData = await ChatsService.createChat(name);

    return res.status(httpStatusCodes.CREATED).json(chatData);
  } catch (error) {
    next(error);
  }
};

const toggleUserInChat = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const chatWithNewUser = await ChatsService.toggleUserInChat(id, userId);

    return res.status(httpStatusCodes.OK).json(chatWithNewUser);
  } catch (error) {
    next(error);
  }
};

module.exports.ChatsController = {
  getChats,
  getChat,
  createChat,
  toggleUserInChat,
};
