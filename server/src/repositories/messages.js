const Message = require('../models/messages');

const getChatMessages = (page, limit, chatId) => {
  // we can fetch deleted messages too, but in client mark them as deleted
  return Message.query()
    .where('chat_id', chatId)
    .withGraphFetched('user')
    .page(page - 1, limit);
};

const getMessageById = (id) => {
  return Message.query().whereNotDeleted().findById(id);
};

const createMessage = (payload) => {
  return Message.query().insertAndFetch(payload);
};

const editMessage = (id, body) => {
  return Message.query().patchAndFetchById(id, { body });
};

const deleteMessage = (id) => Message.query().deleteById(id);

module.exports.MessagesRepository = {
  getChatMessages,
  getMessageById,
  createMessage,
  editMessage,
  deleteMessage,
};
