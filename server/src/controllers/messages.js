const httpStatusCodes = require('../utils/http-status-codes');
const { MessagesService } = require('../services/messages');

const { defaultPage, defaultLimitPerPage } = require('../../config').server;

const getChatMessages = async (req, res, next) => {
  const { page = defaultPage, limit = defaultLimitPerPage } = req.query;
  const endpoint = req.headers.host + req.baseUrl + req.path;
  const { id } = req.params;

  try {
    const chatMessages = await MessagesService.getChatMessages(page, limit, endpoint, id);

    return res.status(httpStatusCodes.OK).json(chatMessages);
  } catch (error) {
    next(error);
  }
};

const createMessage = async (req, res, next) => {
  const { body } = req.body;
  const { id } = req.params;

  try {
    const message = await MessagesService.createMessage(id, req.user, body);

    return res.status(httpStatusCodes.CREATED).json(message);
  } catch (error) {
    next(error);
  }
};

const editMessage = async (req, res, next) => {
  const { body } = req.body;
  const { messageId } = req.params;

  try {
    const message = await MessagesService.editMessage(messageId, req.user, body);

    return res.status(httpStatusCodes.OK).json(message);
  } catch (error) {
    next(error);
  }
};

const deleteMessage = async (req, res, next) => {
  const { messageId } = req.params;

  try {
    const message = await MessagesService.deleteMessage(messageId, req.user);

    return res.status(httpStatusCodes.OK).json(message);
  } catch (error) {
    next(error);
  }
};

module.exports.MessagesController = {
  getChatMessages,
  createMessage,
  editMessage,
  deleteMessage,
};
