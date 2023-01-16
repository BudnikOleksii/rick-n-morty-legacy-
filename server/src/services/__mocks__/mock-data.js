const { mockUserFromDB } = require('../../repositories/__mocks__/users').UserRepository.mockData;

const page = 1;
const limit = 20;
const incorrectLimit = limit * 1000;
const notFoundId = 0.1;

const mockLot = {
  lastPersonToBet: mockUserFromDB,
  current_price: 1000,
  card: {
    character: {
      name: 'Rick',
    },
    owner: mockUserFromDB,
  },
};

module.exports = { page, limit, incorrectLimit, notFoundId, mockLot };
