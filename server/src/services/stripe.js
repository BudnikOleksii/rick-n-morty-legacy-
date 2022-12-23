const { UserService } = require('./users');
const { stripeSecretKey, stripeCurrency } = require('../../config').server;

const stripe = require('stripe')(stripeSecretKey);

const createCustomer = async (token) => {
  const existingCustomers = await stripe.customers.list({ email: token.email });
  let currentCustomer;

  if (existingCustomers.data.length) {
    currentCustomer = existingCustomers.data[0];
  } else {
    currentCustomer = await stripe.customers.create({
      email: token.email,
    });
  }

  return currentCustomer;
};

const createAccountForCustomer = (email) => {
  return stripe.accounts.create({
    type: 'custom',
    business_type: 'individual',
    email,
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
};

const handleStripePayment = async (userId, token, amount) => {
  const currentCustomer = await createCustomer(token);
  const source = await stripe.customers.createSource(currentCustomer.id, { source: token.id });
  const user = await UserService.getUserById(userId);

  if (!user.stripe_account_id) {
    const customersAccount = await createAccountForCustomer(token.email);
    await UserService.updateUser(userId, { stripe_account_id: customersAccount.id });
  }

  await stripe.charges.create({
    source: source.id,
    amount,
    currency: stripeCurrency,
    receipt_email: token.email,
    customer: currentCustomer.id,
  });
};

const handleStripeWithdrawal = async (userId, token, amount) => {
  const user = await UserService.getUserById(userId);

  // TODO fix capabilities for created account!
  const withdraw = await stripe.transfers.create({
    amount,
    currency: stripeCurrency,
    destination: user.stripe_account_id,
    description: `Withdrawal for user ${user.email}`,
    source_type: 'card',
  });

  console.log(withdraw);
};

module.exports.StripeService = {
  handleStripePayment,
  handleStripeWithdrawal,
};
