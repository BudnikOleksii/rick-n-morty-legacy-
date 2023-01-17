const { RatingService } = require('./rating');

const { mockUserFromDB } = require('../repositories/__mocks__/users').UserRepository.mockData;

jest.mock('../repositories/cards');
jest.mock('../repositories/sets');
jest.mock('../repositories/users');
describe('updateUserRating', function () {
  it('should return user with recalculated rating', async function () {
    const user = await RatingService.updateUserRating(mockUserFromDB.id);
    expect(user).toStrictEqual(mockUserFromDB);
  });
});
