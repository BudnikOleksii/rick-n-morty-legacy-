const { checkLimitForRequest } = require('../utils/check-limit-for-request');
const { createInfoData } = require('../utils/create-info-data');
const { checkId } = require('../utils/check-id');
const { MessagesRepository } = require('../repositories/messages');
const { BadRequestError, ForbiddenError } = require('../utils/errors/api-errors');
const { checkMessageLength } = require('../utils/check-message-length');

const getChatMessages = async (page, limit, endpoint, chatId) => {
  checkId(chatId);
  checkLimitForRequest(limit, 'messages');
  const { results, total } = await MessagesRepository.getChatMessages(page, limit, chatId);

  return {
    info: createInfoData(total, page, limit, endpoint),
    results,
  };
};

const getMessageById = async (id) => {
  checkId(id);
  const message = await MessagesRepository.getMessageById(id);

  if (!message) {
    throw new BadRequestError(['Message not found']);
  }

  return message;
};

const createMessage = (chatId, tokenData, body) => {
  checkMessageLength(body);

  const message = {
    chat_id: chatId,
    user_id: tokenData.id,
    body,
  };

  return MessagesRepository.createMessage(message);
};

const editMessage = async (messageId, tokenData, body) => {
  const message = await getMessageById(messageId);

  if (message.user_id !== tokenData.id) {
    throw new ForbiddenError(['You can edit only your messages']);
  }

  checkMessageLength(body);

  return MessagesRepository.editMessage(messageId, body);
};

const deleteMessage = async (messageId, tokenData) => {
  const message = await getMessageById(messageId);

  if (message.user_id !== tokenData.id) {
    throw new ForbiddenError(['You can delete only your messages']);
  }

  return MessagesRepository.deleteMessage(messageId);
};

module.exports.MessagesService = {
  getChatMessages,
  getMessageById,
  createMessage,
  editMessage,
  deleteMessage,
};
