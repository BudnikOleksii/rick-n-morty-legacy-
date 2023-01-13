const { LocationsService } = require('./locations');
const { mockData } = require('../repositories/__mocks__/locations').LocationsRepository;

const { mockLocations } = mockData;

jest.mock('../repositories/locations');

describe('getLocations', function () {
  it('should return correct info object and an array of locations', function () {
    const locations = LocationsService.getLocations();
    expect(locations).toStrictEqual(mockLocations);
  });
});
