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

const handleStripePayment = async (token, amount) => {
  const currentCustomer = await createCustomer(token);
  const source = await stripe.customers.createSource(currentCustomer.id, { source: token.id });

  await stripe.charges.create({
    source: source.id,
    amount,
    currency: stripeCurrency,
    receipt_email: token.email,
    customer: currentCustomer.id,
  });
};

const handleStripeWithdrawal = async (token, amount) => {
  const existingCustomers = await stripe.customers.list({ email: token.email });
  console.log(existingCustomers.data[0].default_source);

  const withdraw = await stripe.payouts.create({
    amount,
    currency: stripeCurrency,
    destination: existingCustomers.data[0].default_source,
    description: `Withdrawal for user ${token.email}`,
    source_type: 'card',
  });
};

module.exports.StripeService = {
  handleStripePayment,
  handleStripeWithdrawal,
};
