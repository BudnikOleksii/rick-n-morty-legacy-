const Location = require('../models/__mocks__/locations');
const { LocationsRepository } = require('./locations');

jest.mock('../models/locations');

describe('getLocations', function () {
  it('should return location query with results', function () {
    const locationsQuery = LocationsRepository.getLocations();
    expect(locationsQuery.mockResults).toStrictEqual(Location.mockData);
  });
});
