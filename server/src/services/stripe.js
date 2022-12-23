const { UserService } = require('./users');
const { stripeSecretKey, stripeCurrency, cardPointsRate } = require('../../config').server;

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

const createAccountForCustomer = (user) => {
  return stripe.accounts.create({
    type: 'custom',
    business_type: 'individual',
    email: user.login,
    individual: {
      email: user.login,
      first_name: user.username,
    },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
};

const handleStripePayment = async (userId, amount, token) => {
  const currentCustomer = await createCustomer(token);
  const source = await stripe.customers.createSource(currentCustomer.id, { source: token.id });
  const user = await UserService.getUserById(userId);

  if (!user.stripe_account_id) {
    const customersAccount = await createAccountForCustomer(user);
    await UserService.updateUser(userId, { stripe_account_id: customersAccount.id });
  }

  await stripe.charges.create({
    source: source.id,
    amount: amount * cardPointsRate,
    currency: stripeCurrency,
    receipt_email: token.email,
    customer: currentCustomer.id,
  });
};

const handleStripeWithdrawal = async (userId, amount) => {
  const user = await UserService.getUserById(userId);
  // TODO check user balance
  // TODO collect fee before transfer

  // TODO fix capabilities for created account!
  const transfer = await stripe.transfers.create({
    amount: amount * cardPointsRate,
    currency: stripeCurrency,
    destination: user.stripe_account_id,
    description: `Withdrawal for user ${user.email}`,
    source_type: 'card',
  });

  console.log(transfer);
};

module.exports.StripeService = {
  handleStripePayment,
  handleStripeWithdrawal,
};
