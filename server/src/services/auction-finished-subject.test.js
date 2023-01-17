const { MailService } = require('./mail-service');
const { RatingService } = require('./rating');
const { mockLot } = require('./__mocks__/mock-data');
const { auctionFinished } = require('./auction-finished-subject');

jest.spyOn(RatingService, 'updateUserRating').mockImplementation(() => ({}));
jest.mock('./mail-service', () => ({
  MailService: {
    informAuctionWinner: jest.fn(),
    informLotSeller: jest.fn(),
  },
}));

describe('updateRating', function () {
  it('should update rating for previous and new owner and notify them via email', function () {
    auctionFinished.next(mockLot);

    expect(RatingService.updateUserRating).toBeCalledWith(mockLot.lastPersonToBet.id);
    expect(RatingService.updateUserRating).toBeCalledWith(mockLot.card.owner.id);
    expect(MailService.informAuctionWinner).toBeCalledWith(mockLot);
  });

  it('should update rating for new owner and notify via email if card don`t have previous owner', function () {
    const lotWithoutOwner = { ...mockLot };
    lotWithoutOwner.card.owner = null;
    auctionFinished.next(lotWithoutOwner);

    expect(RatingService.updateUserRating).toBeCalledWith(lotWithoutOwner.lastPersonToBet.id);
    expect(RatingService.updateUserRating).toHaveBeenCalledTimes(1);
    expect(MailService.informAuctionWinner).toBeCalledWith(lotWithoutOwner);
    expect(MailService.informLotSeller).toHaveBeenCalledTimes(0);
  });
});
