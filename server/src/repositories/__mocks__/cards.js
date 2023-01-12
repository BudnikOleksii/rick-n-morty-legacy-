const mockUserId = 2;
const mockCard = { id: 1, owner_id: mockUserId, character_id: 1, character: { id: 3 } };
const mockCard2 = { id: 2, owner_id: mockUserId, character_id: 2, character: { id: 3 } };
const mockCards = [mockCard, mockCard2];
const mockCardsFromDB = {
  results: mockCards,
  total: mockCards.length,
};

module.exports.CardsRepository = {
  getCards: jest.fn(() => mockCardsFromDB),
  getCardById: jest.fn((id) => mockCards.find((card) => card.id === id)),
  getUserCards: jest.fn(() => mockCardsFromDB),
  getAllUserCards: jest.fn((userId) => mockCards.filter((card) => card.owner_id === userId)),
  createCard: jest.fn((character) => ({
    id: mockCards.length + 1,
    owner_id: null,
    character_id: character.id,
  })),
  changeOwner: jest.fn((card, newOwner) => ({
    ...card,
    owner_id: newOwner.id,
  })),
  mockData: {
    mockCardsFromDB,
    mockCard,
    mockCards,
    mockUserId,
  },
};
