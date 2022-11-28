const { Subject } = require('rxjs');
const { CardsService } = require('./cards');
const { SetsService } = require('./sets');
const { UserService } = require('./users');

const ratingSubject = new Subject();

ratingSubject.subscribe({
  next: async (lot) => {
    const { owner, lastPersonToBet } = lot;
    const newOwnerCardsCount = (await CardsService.getAllUserCards(lastPersonToBet.id)).length;
    const newOwnerSetsBonus = (await SetsService.getUserSets(lastPersonToBet.id)).ratingBonus;

    await UserService.updateUser(lastPersonToBet.id, {
      rating: newOwnerCardsCount + newOwnerSetsBonus,
    });

    if (owner) {
      const oldOwnerCardsCount = (await CardsService.getAllUserCards(owner.id)).length;
      const oldOwnerSetsBonus = (await SetsService.getUserSets(owner.id)).ratingBonus;

      await UserService.updateUser(lastPersonToBet.id, {
        rating: oldOwnerCardsCount + oldOwnerSetsBonus,
      });
    }
  },
});

module.exports = {
  ratingSubject,
};
