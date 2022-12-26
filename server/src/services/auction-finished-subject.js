const { Subject } = require('rxjs');
const { RatingService } = require('./rating');
const { MailService } = require('./mail-service');

const auctionFinished = new Subject();

const updateRating = async (lot) => {
  const {
    card: { owner },
    lastPersonToBet,
  } = lot;
  await RatingService.updateUserRating(lastPersonToBet.id);

  if (owner) {
    await RatingService.updateUserRating(owner.id);
  }
};

const notifyUsers = async (lot) => {
  await MailService.informAuctionWinner(lot);

  if (lot.card.owner) {
    await MailService.informLotSeller(lot);
  }
};

auctionFinished.subscribe(updateRating);
auctionFinished.subscribe(notifyUsers);

module.exports = {
  auctionFinished,
};
