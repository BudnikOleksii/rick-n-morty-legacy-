const Lot = require('../models/__mocks__/lots');
const { LotsRepository } = require('./lots');
const Episode = require('../models/__mocks__/episodes');

jest.mock('../models/lots');

const testId = 1;
const testCardId = 5;
const testUser = { id: 1, username: 'admin' };

describe('getAllFinishedLots', function () {
  it('should return query with all finished lots', function () {
    const lotsQuery = LotsRepository.getAllFinishedLots();
    expect(lotsQuery.mockResults).toStrictEqual(Lot.mockData);
  });
});

describe('getLots', function () {
  const queryParams = {
    minPrice: 1,
    maxPrice: 1000,
    order: 'asc',
    page: 1,
    limit: 20,
  };

  it('should return results and total lots count', function () {
    const { results, total } = LotsRepository.getLots(queryParams);
    expect(results).toStrictEqual(Lot.mockData);
    expect(total).toBe(Episode.mockData.length);
  });
});

describe('getLotsPriceRange', function () {
  it('should min and max current price', function () {
    const { min, max } = LotsRepository.getLotsPriceRange();
    expect(min).toBe(Lot.minPrice);
    expect(max).toBe(Lot.maxPrice);
  });
});

describe('getLot', function () {
  it('should min and max current price', function () {
    const lot = LotsRepository.getLot('id', testId);
    expect(lot.id).toBe(testId);
  });
});

describe('createLot', function () {
  it('should create lot and return query with new lot', function () {
    const lot = LotsRepository.createLot({ card_id: testCardId });
    expect(lot.id).toBe(testId);
  });
});

describe('updateLot', function () {
  const payload = { current_price: 1000 };
  it('should update and return lot', async function () {
    const lot = await LotsRepository.updateLot(testId, testUser, payload);
    expect(Lot.patchAndFetchById).toBeCalledWith(testId, payload);
    expect(lot.id).toBe(testId);
  });
});

describe('finishAuction', function () {
  it('should return 1 if auction finshed succesfully', function () {
    const finished = LotsRepository.finishAuction(testId);
    expect(finished).toBe(1);
  });
});
