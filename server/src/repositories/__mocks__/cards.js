const mockUserId = 2;
const mockCard = { id: 1, owner_id: mockUserId, character_id: 1, owner: { id: 1 } };
const mockCard2 = { id: 2, owner_id: mockUserId, character_id: 2, owner: { id: 2 } };
const mockCard3 = { id: 3, owner_id: mockUserId, character_id: 3, owner: null };
const mockCards = [mockCard, mockCard2, mockCard3];
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
    mockCard2,
    mockCard3,
    mockCards,
    mockUserId,
  },
};
