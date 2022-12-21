const Message = require('../models/messages');

const getChatMessages = (page, limit, chatId) => {
  // we can fetch deleted messages too, but in client mark them as deleted
  return Message.query()
    .where('chat_id', chatId)
    .withGraphFetched('user')
    .page(page - 1, limit)
    .orderBy('created_at', 'desc');
};

const getMessageById = (id) => {
  return Message.query().withGraphFetched('user').findById(id);
};

const createMessage = (payload) => {
  return Message.query().insertAndFetch(payload).withGraphFetched('user');
};

const editMessage = (id, body) => {
  return Message.query().patchAndFetchById(id, { body }).withGraphFetched('user');
};

const deleteMessage = async (id) => {
  await Message.query().deleteById(id);

  return getMessageById(id);
};

module.exports.MessagesRepository = {
  getChatMessages,
  getMessageById,
  createMessage,
  editMessage,
  deleteMessage,
};
