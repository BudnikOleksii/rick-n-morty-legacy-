const { CardsService } = require('./cards');
const { SetsService } = require('./sets');
const { UserService } = require('./users');
const updateUserRating = async (userId) => {
  const userCardsCount = (await CardsService.getAllUserCards(userId)).length;
  const userSetsBonus = (await SetsService.getUserSets(userId)).ratingBonus;

  await UserService.updateUser(userId, {
    rating: userCardsCount + userSetsBonus,
  });
};

module.exports.RatingService = {
  updateUserRating,
};
