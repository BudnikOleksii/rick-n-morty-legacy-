const MockBaseModel = require('./base-model');
const mockLocation = { id: 1 };
const mockLocation2 = { id: 2 };

class Location extends MockBaseModel {}

Location.mockData = [mockLocation, mockLocation2];
Location.mockResults = [mockLocation, mockLocation2];

module.exports = Location;
