const User = require('./users');
const { Model } = require('objection');

describe('User model', function () {
  const user = new User();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(user instanceof Model).toBeTruthy();
    expect(User.tableName).toBe('users');
    expect(typeof User.relationMappings).toBe('object');
  });

  it('should have $formatJson method that returns object without extra data', function () {
    const baseData = { id: 1 };
    const returnedData = user.$formatJson({
      ...baseData,
      login: 'user@gmail.com',
      password: 'root',
      deleted_at: 'some date',
      stripe_account_id: 'stripe_account_id',
    });

    expect(returnedData).toStrictEqual(baseData);
  });

  it('should set date to our user last_visit_date field', function () {
    user.$beforeUpdate();
    expect(user.last_visit_date.getDate()).toBe(new Date().getDate());
  });
});
