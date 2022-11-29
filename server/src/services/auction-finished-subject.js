const { Subject } = require('rxjs');
const { RatingService } = require('./rating');

const auctionFinished = new Subject();

const updateRating = async (lot) => {
  const { owner, lastPersonToBet } = lot;
  await RatingService.updateUserRating(lastPersonToBet.id);

  if (owner) {
    await RatingService.updateUserRating(owner.id);
  }
};

auctionFinished.subscribe(updateRating);

module.exports = {
  auctionFinished,
};
