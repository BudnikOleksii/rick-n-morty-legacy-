const Chat = require('../models/chats');

const getChats = () => Chat.query()
  .withGraphFetched('users');

const getChat = (columnName, value) => {
  return Chat.query().findOne(columnName, value);
};

const getChatById = (id) => {
  return Chat.query()
    .findById(id)
    .withGraphFetched('users');
};

const createChat = (name) => {
  return Chat.query().insertAndFetch({ name });
};

const addUserToChat = async (chat, user) => {
  await chat
    .$relatedQuery('users')
    .relate(user);

  return getChat('id', chat.id);
};

const removeUserFromChat = async (chat, user) => {
  await chat
    .$relatedQuery('users')
    .unrelate()
    .where('id', user.id);

  return getChat('id', chat.id);
};

module.exports.ChatsRepository = {
  getChats,
  getChat,
  getChatById,
  createChat,
  addUserToChat,
  removeUserFromChat,
};
