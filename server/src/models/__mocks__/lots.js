const MockBaseModel = require('./base-model');
const minPrice = 100;
const maxPrice = 1000;
const mockLot = { id: 1, current_price: minPrice, end_date: '2023-01-11T08:26:30.305Z' };
const mockLot2 = { id: 2, current_price: maxPrice, end_date: '2023-01-11T08:26:30.305Z' };

class Lot extends MockBaseModel {}

Lot.mockData = [mockLot, mockLot2];
Lot.mockResults = [mockLot, mockLot2];
Lot.minPrice = minPrice;
Lot.maxPrice = maxPrice;

module.exports = Lot;
