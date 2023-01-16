const mockMessage = { id: 1, chat_id: 1, user_id: 1, body: 'something' };
const mockMessage2 = { id: 2, chat_id: 1, user_id: 2, body: 'something' };
const mockMessages = [mockMessage, mockMessage2];
const mockMessageFromDB = {
  results: mockMessages,
  total: mockMessages.length,
};

const getMessageById = jest.fn((messageId) =>
  mockMessages.find((message) => message.id === messageId)
);

module.exports.MessagesRepository = {
  getChatMessages: jest.fn(() => mockMessageFromDB),
  getMessageById,
  createMessage: jest.fn((message) => ({ id: mockMessages.length + 1, ...message })),
  editMessage: jest.fn((messageId, body) => {
    const message = getMessageById(messageId);

    return { ...message, body };
  }),
  deleteMessage: jest.fn((messageId) => (getMessageById(messageId) ? 1 : 0)),
  mockData: {
    mockMessageFromDB,
    mockMessage,
    mockMessage2,
  },
};
