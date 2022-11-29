const { ChatsRepository } = require('../repositories/chats');
const { checkNameLength } = require('../utils/check-name-length');
const { BadRequestError, NotFoundError} = require('../utils/errors/api-errors');
const { UserService } = require('./users');
const { checkId } = require('../utils/check-id');

const getChats = () => ChatsRepository.getChats();

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
  const user = await UserService.getUserById(userId);
  // const isUserHaveExistingChat = chat.characters.some(character => character.id === Number(characterId));
  //
  // if (isSetHaveExistingCharacter) {
  //   return SetsRepository.removeCharacterFromSet(set, character);
  // }

  return ChatsRepository.addUserToChat(chat, user);
};

module.exports.ChatsService = {
  getChats,
  getChatById,
  createChat,
  toggleUserInChat,
};
