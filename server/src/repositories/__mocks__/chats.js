const mockUserId = 2;
const mockChat = { id: 1, name: 'Rick`s chat' };
const mockChat2 = { id: 2, name: 'Mortie`s Chat' };
const mockChats = [mockChat, mockChat2];
const mockChatsFromDB = {
  results: mockChats,
  total: mockChats.length,
};

module.exports.ChatsRepository = {
  getChats: jest.fn(() => mockChatsFromDB),
  getChat: jest.fn((columnName, value) => mockChats.find((chat) => chat[columnName] === value)),
  getChatById: jest.fn((chatId) => mockChats.find((chat) => chat.id === chatId)),
  createChat: jest.fn((name) => ({ id: mockChats.length + 1, name })),
  getUserChats: jest.fn(() => mockChatsFromDB),
  mockData: {
    mockChatsFromDB,
    mockChat,
    mockChats,
    mockUserId,
  },
};
