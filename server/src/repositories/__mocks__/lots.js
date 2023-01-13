const { mockCard, mockCard2 } = require('./cards').CardsRepository.mockData;

const mockLot = {
  id: 1,
  card_id: 3,
  end_date: '2023-01-13T12:29:44.493Z',
  card: mockCard,
  current_price: 100,
  max_price: 2000,
  min_step: 100,
};
const mockLot2 = {
  id: 2,
  card_id: 4,
  end_date: '2024-01-13T12:29:44.493Z',
  card: mockCard2,
  current_price: 100,
  max_price: 2000,
  min_step: 100,
};
const mockLots = [mockLot, mockLot2];
const mockLotsFromDB = {
  results: mockLots,
  total: mockLots.length,
};

module.exports.LotsRepository = {
  getLots: jest.fn(() => mockLotsFromDB),
  getLot: jest.fn((columnName, value) => mockLots.find((lot) => lot[columnName] === value)),
  createLot: jest.fn((payload) => payload),
  finishAuction: jest.fn(),
  updateLot: jest.fn((lotId, user, payload) => {
    const lot = mockLots.find((lot) => lot.id === lotId);

    return {
      ...lot,
      ...payload,
      card: {
        ...lot.card,
        owner: user,
      },
    };
  }),
  getAllFinishedLots: jest.fn(() => mockLots),
  getLotsPriceRange: jest.fn(() => [mockLot.current_price, mockLot.current_price]),
  mockData: {
    mockLotsFromDB,
    mockLot,
    mockLot2,
  },
};
