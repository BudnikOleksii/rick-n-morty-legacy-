const mockChat = { id: 1, name: 'Rick and Morty main', users: [{ id: 1 }] };
const mockChats = [mockChat];
const mockChatsFromDB = {
  results: mockChats,
  total: mockChats.length,
};

module.exports.SetsRepository = {
  getSets: jest.fn(() => mockChatsFromDB),
  mockData: {
    mockChats,
    mockChatsFromDB,
  },
};
