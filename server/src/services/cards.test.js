const { BadRequestError, NotFoundError } = require('../utils/errors/api-errors');
const { CardsRepository } = require('../repositories/cards');
const { CardsService } = require('./cards');
const { mockData } = require('../repositories/__mocks__/cards').CardsRepository;
const { mockUserFromDB } = require('../repositories/__mocks__/users').UserRepository.mockData;

const { mockCardsFromDB, mockCard, mockUserId, mockCards } = mockData;
const mockUserCards = mockCards.filter((card) => card.owner_id === mockUserId);
const cardId = mockCard.id;
const page = 1;
const limit = 20;
const incorrectLimit = limit * 1000;
const endpoint = 'localhost:8080/v1/cards';
const notFoundId = 0.1;

jest.mock('../repositories/cards');
jest.mock('../repositories/characters');
jest.mock('../repositories/users');

describe('getCards', function () {
  it('should not call CardsRepository.getCards if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(CardsService.getCards(page, incorrectLimit, endpoint)).rejects.toThrow(
      BadRequestError
    );
    expect(CardsRepository.getCards).toHaveBeenCalledTimes(0);
  });

  it('should return correct info object and an array of cards', async function () {
    const { info, results } = await CardsService.getCards(page, limit, endpoint);

    expect(info.total).toBe(mockCardsFromDB.total);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
    expect(results).toStrictEqual(mockCardsFromDB.results);
  });
});

describe('getCardById', function () {
  const incorrectCardId = 100;

  it('should throw BadRequestError if incorrect id provided', async function () {
    expect.assertions(2);
    await expect(CardsService.getCardById('invalid id')).rejects.toThrow(BadRequestError);
    expect(CardsRepository.getCardById).toHaveBeenCalledTimes(0);
  });

  it('should throw NotFoundError if card not found', async function () {
    expect.assertions(1);
    await expect(CardsService.getCardById(incorrectCardId)).rejects.toThrow(NotFoundError);
  });

  it('should return card', async function () {
    const card = await CardsService.getCardById(cardId);
    expect(card).toStrictEqual(mockCard);
  });
});

describe('getUserCards', function () {
  it('should not call CardsRepository.getCards if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(
      CardsService.getUserCards(page, incorrectLimit, endpoint, mockUserId)
    ).rejects.toThrow(BadRequestError);
    expect(CardsRepository.getUserCards).toHaveBeenCalledTimes(0);
  });

  it('should return correct info object and array of user cards', async function () {
    const { info, results } = await CardsService.getUserCards(page, limit, endpoint, mockUserId);

    expect(info.total).toBe(mockUserCards.length);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
    expect(results).toStrictEqual(mockCardsFromDB.results);
  });
});

describe('getAllUserCards', function () {
  it('should return array of user cards', async function () {
    const cards = await CardsService.getAllUserCards(mockUserId);
    expect(cards).toStrictEqual(mockUserCards);
  });
});

describe('createCard', function () {
  const characterId = 1;
  it('should return new card without owner and with relevant character id', async function () {
    const card = await CardsService.createCard(characterId);
    expect(card.character_id).toBe(characterId);
    expect(card.owner_id).toBeNull();
  });

  it('should throw NotFoundError if card not found and dont call CardsRepository.createCard', async function () {
    expect.assertions(2);
    await expect(CardsService.createCard(notFoundId)).rejects.toThrow(NotFoundError);
    expect(CardsRepository.createCard).toHaveBeenCalledTimes(0);
  });
});

describe('changeOwner', function () {
  const newUserId = mockUserFromDB.id;
  it('should return card with new owner id', async function () {
    const card = await CardsService.changeOwner(cardId, newUserId);
    expect(card.owner_id).toBe(newUserId);
    expect(card.id).toBe(cardId);
  });

  it('should throw NotFoundError if card not found and dont call CardsRepository.changeOwner', async function () {
    expect.assertions(2);
    await expect(CardsService.changeOwner(notFoundId, newUserId)).rejects.toThrow(NotFoundError);
    expect(CardsRepository.changeOwner).toHaveBeenCalledTimes(0);
  });

  it('should throw NotFoundError if user not found and dont call CardsRepository.changeOwner', async function () {
    expect.assertions(2);
    await expect(CardsService.changeOwner(cardId, notFoundId)).rejects.toThrow(NotFoundError);
    expect(CardsRepository.changeOwner).toHaveBeenCalledTimes(0);
  });
});
