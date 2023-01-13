const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors/api-errors');
const { page, limit, incorrectLimit, notFoundId } = require('./__mocks__/mock-data');
const { LotsRepository } = require('../repositories/lots');
const { LotsService } = require('./lots');
const { CardsService } = require('./cards');
const { CharactersRepository } = require('../repositories/characters');
const { TransactionService } = require('./transactions');
const { auctionFinished } = require('./auction-finished-subject');
const { mockData } = require('../repositories/__mocks__/lots').LotsRepository;
const { mockCard, mockCard2, mockCard3 } = require('../repositories/__mocks__/cards')
  .CardsRepository.mockData;
const { mockUsers } = require('../repositories/__mocks__/users').UserRepository.mockData;

const { mockLotsFromDB, mockLot, mockLot2 } = mockData;
const lotId = mockLot.id;
const endpoint = 'localhost:8080/v1/lots';
const adminTokenData = {
  id: mockCard.owner.id,
  roles: [{ id: 1, title: 'admin' }],
};
const userTokenData = {
  id: mockCard2.owner.id,
  roles: [{ id: 2, title: 'user' }],
};

jest.mock('../repositories/lots');
jest.mock('../repositories/cards');
jest.mock('../repositories/users');
jest.mock('../repositories/characters');

describe('getLots', function () {
  const params = { page, limit };
  it('should not call LotsRepository.getLots if limit incorrect and throw BadRequestError', async function () {
    expect.assertions(2);
    await expect(
      LotsService.getLots({ ...params, limit: incorrectLimit }, endpoint)
    ).rejects.toThrow(BadRequestError);
    expect(LotsRepository.getLots).toHaveBeenCalledTimes(0);
  });

  it('should return correct info object and an array of lots', async function () {
    const { info, results } = await LotsService.getLots(params, endpoint);

    expect(info.total).toBe(mockLotsFromDB.total);
    expect(info.next).toBeNull();
    expect(info.prev).toBeNull();
    expect(info.pages).toBe(1);
    expect(results).toStrictEqual(mockLotsFromDB.results);
  });
});

describe('getLotById', function () {
  it('should throw BadRequestError if incorrect id provided', async function () {
    expect.assertions(2);
    await expect(LotsService.getLotById('invalid id')).rejects.toThrow(BadRequestError);
    expect(LotsRepository.getLot).toHaveBeenCalledTimes(0);
  });

  it('should throw NotFoundError if lot not found', async function () {
    expect.assertions(1);
    await expect(LotsService.getLotById(notFoundId)).rejects.toThrow(NotFoundError);
  });

  it('should return lot found by id', async function () {
    const lot = await LotsService.getLotById(lotId);
    expect(lot).toStrictEqual(mockLot);
  });
});

describe('createLot', function () {
  const firstCardBody = { cardId: mockCard.id };
  const secondCardBody = { cardId: mockCard2.id };
  const thirdCardBody = { cardId: mockCard3.id };

  it('should return new lot with correct card_id if auction starts card owner', async function () {
    const lot = await LotsService.createLot(firstCardBody, adminTokenData);
    expect(lot.card_id).toBe(firstCardBody.cardId);
  });

  it('should return new lot with correct card_id if card have no owner and auction starts by admin', async function () {
    const lot = await LotsService.createLot(secondCardBody, userTokenData);
    expect(lot.card_id).toBe(secondCardBody.cardId);
  });

  it('should throw ForbiddenError if auction tried to start not an owner', async function () {
    expect.assertions(3);
    await expect(LotsService.createLot(secondCardBody, adminTokenData)).rejects.toThrow(
      ForbiddenError
    );
    expect(LotsRepository.getLot).toHaveBeenCalledTimes(0);
    expect(LotsRepository.createLot).toHaveBeenCalledTimes(0);
  });

  it('should throw BadRequestError if auction with current card already exists', async function () {
    expect.assertions(2);
    await expect(LotsService.createLot(thirdCardBody, adminTokenData)).rejects.toThrow(
      BadRequestError
    );
    expect(LotsRepository.createLot).toHaveBeenCalledTimes(0);
  });
});

describe('finishAuction', function () {
  const lastPersonToBet = { id: 1 };
  const lot = {
    id: 1,
    card: {
      id: 1,
      character: {
        id: 3,
      },
    },
    lastPersonToBet: null,
  };
  jest.spyOn(CardsService, 'changeOwner');
  jest.spyOn(TransactionService, 'createTransaction').mockImplementation(() => {});
  jest.spyOn(auctionFinished, 'next').mockImplementation(() => {});

  it('should finish auction and do not call other actions if no one bet for lot', async function () {
    await LotsService.finishAuction(lot);
    expect(LotsRepository.finishAuction).toBeCalledWith(lot.id);
    expect(CardsService.changeOwner).toBeCalledTimes(0);
    expect(CharactersRepository.markCharacterAsUsed).toBeCalledTimes(0);
    expect(TransactionService.createTransaction).toBeCalledTimes(0);
    expect(auctionFinished.next).toBeCalledTimes(0);
  });

  it('should call changeOwner, markCharacterAsUsed and createTransaction methods if someone bet for lot', async function () {
    lot.lastPersonToBet = lastPersonToBet;

    await LotsService.finishAuction(lot);
    expect(LotsRepository.finishAuction).toBeCalledWith(lot.id);
    expect(CardsService.changeOwner).toBeCalledWith(lot.card.id, lastPersonToBet.id);
    expect(CharactersRepository.markCharacterAsUsed).toBeCalledWith(lot.card.character.id);
    expect(TransactionService.createTransaction).toBeCalledWith(lot);
    expect(auctionFinished.next).toBeCalledWith(lot);
  });
});

describe('handleBet', function () {
  jest.spyOn(TransactionService, 'getUserBalance').mockImplementation(() => ({ balance: 500 }));

  it('should throw BadRequestError bet is NaN', async function () {
    expect.assertions(2);
    await expect(LotsService.handleBet(mockLot.id, 'NaN', adminTokenData)).rejects.toThrow(
      BadRequestError
    );
    expect(LotsRepository.updateLot).toHaveBeenCalledTimes(0);
  });

  it('should throw BadRequestError and finish auction if end date in past', async function () {
    expect.assertions(3);
    await expect(LotsService.handleBet(mockLot.id, 1000, adminTokenData)).rejects.toThrow(
      BadRequestError
    );
    expect(LotsRepository.finishAuction).toBeCalled();
    expect(LotsRepository.updateLot).toHaveBeenCalledTimes(0);
  });

  it('should throw BadRequestError if you try to bet for your own lot', async function () {
    expect.assertions(2);
    await expect(LotsService.handleBet(mockLot2.id, 1000, userTokenData)).rejects.toThrow(
      BadRequestError
    );
    expect(LotsRepository.updateLot).toHaveBeenCalledTimes(0);
  });

  it('should throw BadRequestError if bet is not higher than current price', async function () {
    expect.assertions(2);
    await expect(
      LotsService.handleBet(mockLot2.id, mockLot2.current_price, adminTokenData)
    ).rejects.toThrow(BadRequestError);
    expect(LotsRepository.updateLot).toHaveBeenCalledTimes(0);
  });

  it('should throw BadRequestError if step is less than min step', async function () {
    const bet = mockLot2.current_price + mockLot2.min_step - 1;
    expect.assertions(2);
    await expect(LotsService.handleBet(mockLot2.id, bet, adminTokenData)).rejects.toThrow(
      BadRequestError
    );
    expect(LotsRepository.updateLot).toHaveBeenCalledTimes(0);
  });

  it('should throw BadRequestError if user do not have enough money', async function () {
    expect.assertions(2);
    await expect(LotsService.handleBet(mockLot2.id, 1000, adminTokenData)).rejects.toThrow(
      BadRequestError
    );
    expect(LotsRepository.updateLot).toHaveBeenCalledTimes(0);
  });

  it('should return lot with new owner and current price', async function () {
    const bet = 400;
    const newOwner = mockUsers.find((user) => user.id === adminTokenData.id);
    const lot = await LotsService.handleBet(mockLot2.id, bet, adminTokenData);

    expect(lot.current_price).toBe(bet);
    expect(lot.card.owner).toStrictEqual(newOwner);
  });
});

describe('closeAllFinishedAuctions', function () {
  it('should get all finished lots and finish them', async function () {
    await LotsService.closeAllFinishedAuctions();
    expect(LotsRepository.getAllFinishedLots).toBeCalled();
  });
});

describe('getLotsPriceRange', function () {
  it('should return array witn min and max current price', async function () {
    const [min, max] = await LotsService.getLotsPriceRange();
    expect(min).toBe(mockLot.current_price);
    expect(max).toBe(mockLot2.current_price);
  });
});
