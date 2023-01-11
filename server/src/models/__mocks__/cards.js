const MockBaseModel = require('./base-model');
const mockCard = { id: 1, owner_id: 1 };
const mockCard2 = { id: 2, owner_id: 1 };

class Card extends MockBaseModel {}

Card.mockData = [mockCard, mockCard2];
Card.mockResults = [mockCard, mockCard2];

module.exports = Card;
