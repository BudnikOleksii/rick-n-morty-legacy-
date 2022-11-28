const { Subject } = require('rxjs');
const { CardsService } = require('./cards');
const { SetsService } = require('./sets');
const { UserService } = require('./users');

const auctionFinished = new Subject();

const updateRating = async (userId) => {
  if (!userId) {
    return;
  }

  const userCardsCount = (await CardsService.getAllUserCards(userId)).length;
  const userSetsBonus = (await SetsService.getUserSets(userId)).ratingBonus;

  await UserService.updateUser(userId, {
    rating: userCardsCount + userSetsBonus,
  });
};

auctionFinished.subscribe(updateRating);

module.exports = {
  auctionFinished,
};
