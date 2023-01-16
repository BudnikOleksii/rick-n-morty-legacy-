const { MailService } = require('./mail-service');
const { mockLot } = require('./__mocks__/mock-data');

jest.spyOn(MailService.transporter, 'sendMail').mockImplementation(() => ({}));

describe('sendActivationMail', function () {
  it('should call transporter.sendMail method', function () {
    MailService.sendActivationMail();
    expect(MailService.transporter.sendMail).toBeCalled();
  });
});

describe('informAuctionWinner', function () {
  it('should call transporter.sendMail method', function () {
    MailService.informAuctionWinner(mockLot);
    expect(MailService.transporter.sendMail).toBeCalled();
  });
});

describe('informLotSeller', function () {
  it('should call transporter.sendMail method', function () {
    MailService.informLotSeller(mockLot);
    expect(MailService.transporter.sendMail).toBeCalled();
  });
});
