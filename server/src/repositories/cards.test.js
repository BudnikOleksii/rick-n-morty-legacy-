const Card = require('../models/__mocks__/cards');
const { CardsRepository } = require('./cards');

jest.mock('../models/cards');

const testId = 1;
const testCard = Card.mockData.find((card) => card.id === testId);
const testCharacterId = 5;
const testUserId = 1;
const testUserCards = Card.mockData.filter((card) => card.owner_id === testUserId);

describe('getCards', function () {
  it('should return results and total cards count', function () {
    const { results, total } = CardsRepository.getCards(1, 20);
    expect(results).toStrictEqual(Card.mockData);
    expect(total).toBe(Card.mockData.length);
  });
});

describe('getCardById', function () {
  it('should return card if found', function () {
    const card = CardsRepository.getCardById(Card.id);
    expect(card.mockResults).toStrictEqual(testCard);
  });

  it('should return undefined if card not found', function () {
    const card = CardsRepository.getCardById(11);
    expect(card.mockResults).toBeUndefined();
  });
});

describe('createCard', function () {
  it('should return query with new card', function () {
    const cardsQuery = CardsRepository.createCard({ id: testCharacterId });
    expect(cardsQuery.mockResults.character_id).toBe(testCharacterId);
  });
});

describe('changeOwner', function () {
  it('should relate new owner', async function () {
    const newOwner = { id: 1 };
    CardsRepository.changeOwner(Card, newOwner);

    expect(Card.$relatedQuery).toBeCalledWith('owner');
    expect(Card.relate).toBeCalledWith(newOwner);
  });
});

describe('getUserCards', function () {
  it('should return user cards', function () {
    const { results, total } = CardsRepository.getUserCards(1, 20, testUserId);
    expect(results).toStrictEqual(testUserCards);
    expect(total).toBe(testUserCards.length);
  });
});

describe('getAllUserCards', function () {
  it('should return query with all user cards', function () {
    const cards = CardsRepository.getAllUserCards(testUserId);
    expect(cards.mockResults).toStrictEqual(testUserCards);
  });

  it('should return empty array if user dont have any card', function () {
    const cards = CardsRepository.getAllUserCards(5);
    const userCards = cards.mockResults;
    expect(Array.isArray(userCards)).toBeTruthy();
    expect(userCards.length).toBe(0);
  });
});
