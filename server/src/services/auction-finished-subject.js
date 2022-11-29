const { Subject } = require('rxjs');
const { CardsService } = require('./cards');
const { SetsService } = require('./sets');
const { UserService } = require('./users');

const auctionFinished = new Subject();

const updateUsersRating = async (userId) => {
  const userCardsCount = (await CardsService.getAllUserCards(userId)).length;
  const userSetsBonus = (await SetsService.getUserSets(userId)).ratingBonus;

  await UserService.updateUser(userId, {
    rating: userCardsCount + userSetsBonus,
  });
};

const updateRating = async (lot) => {
  const { owner, lastPersonToBet } = lot;
  await updateUsersRating(lastPersonToBet.id);

  if (owner) {
    await updateUsersRating(owner.id);
  }
};

auctionFinished.subscribe(updateRating);

module.exports = {
  auctionFinished,
};
