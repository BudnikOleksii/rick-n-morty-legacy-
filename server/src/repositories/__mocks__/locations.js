const mockLocation = { id: 1, name: 'Earth' };
const mockLocation2 = { id: 2, name: 'Mars' };
const mockLocations = [mockLocation, mockLocation2];

module.exports.LocationsRepository = {
  getLocations: jest.fn(() => mockLocations),
  mockData: {
    mockLocations,
  },
};
