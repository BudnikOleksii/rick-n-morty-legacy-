const { mockUserFromDB } = require('../repositories/__mocks__/users').UserRepository.mockData;

const mockStripeAccountId = 'stripe_account_id';
const mockSourceId = 'source_id';
const newCustomerEmail = 'user@gmail.com';
const mockAmount = 1000;
const mockAdminToken = { email: mockUserFromDB.login };
const mockUserToken = { email: newCustomerEmail };

jest.mock('../repositories/users');
jest.doMock('stripe', () => {
  return jest.fn(() => ({
    customers: {
      list: jest.fn(({ email }) =>
        Promise.resolve({
          data: mockUserFromDB.login === email ? [mockUserFromDB] : [],
        })
      ),
      create: jest.fn(({ email }) => ({ ...mockUserFromDB, login: email })),
      createSource: jest.fn((id, { source }) => ({ id: mockSourceId })),
    },
    accounts: {
      create: jest.fn(() => ({ id: mockStripeAccountId })),
    },
    charges: {
      create: jest.fn((params) => params),
    },
    transfers: {
      create: jest.fn((params) => params),
    },
  }));
});

// we have to import our service after mock because doMock aren't hoisted
const { StripeService } = require('./stripe');
beforeEach(() => {
  jest.resetModules();
});

describe('createCustomer', function () {
  it('should not create new customer and just return customer', async function () {
    const customer = await StripeService.createCustomer(mockAdminToken);
    expect(customer).toStrictEqual(mockUserFromDB);
  });

  it('should create new customer and return with correct login/email', async function () {
    const customer = await StripeService.createCustomer(mockUserToken);
    expect(customer.login).toBe(newCustomerEmail);
  });
});

describe('createAccountForCustomer', function () {
  it('should create account for customer and return it', function () {
    const customerAccount = StripeService.createAccountForCustomer(mockUserFromDB);
    expect(customerAccount.id).toBe(mockStripeAccountId);
  });
});

describe('handleStripePayment', function () {
  it('should handle payment and return charge', async function () {
    const charge = await StripeService.handleStripePayment(
      mockUserFromDB.id,
      mockAmount,
      mockAdminToken
    );
    expect(charge.source).toBe(mockSourceId);
    expect(charge.amount).toBe(mockAmount);
    expect(charge.receipt_email).toBe(mockAdminToken.email);
  });
});

describe('handleStripeWithdrawal', function () {
  it('should handle withdrawal and return transfer', async function () {
    const transfer = await StripeService.handleStripeWithdrawal(mockUserFromDB.id, mockAmount);
    expect(transfer.destination).toBe(mockUserFromDB.stripe_account_id);
    expect(transfer.amount).toBe(mockAmount);
  });
});
