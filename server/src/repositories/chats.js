const Chat = require('../models/chats');

const getChats = (page, limit) => {
  return Chat.query()
    .withGraphFetched('users')
    .page(page - 1, limit);
};

const getChat = (columnName, value) => {
  return Chat.query().findOne(columnName, value);
};

const getChatById = (id) => {
  return Chat.query().findById(id).withGraphFetched('users');
};

const createChat = (name) => {
  return Chat.query().insertAndFetch({ name });
};

const addUserToChat = async (chat, user) => {
  await chat.$relatedQuery('users').relate(user);

  return getChatById(chat.id);
};

const removeUserFromChat = async (chat, user) => {
  await chat.$relatedQuery('users').unrelate().where('id', user.id);

  return getChatById(chat.id);
};

const getUserChats = (page, limit, userId) => {
  return Chat.query()
    .withGraphFetched('users')
    .whereExists(Chat.relatedQuery('users').where('id', userId))
    .page(page - 1, limit);
};

module.exports.ChatsRepository = {
  getChats,
  getChat,
  getChatById,
  createChat,
  addUserToChat,
  removeUserFromChat,
  getUserChats,
};
