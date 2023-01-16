const Role = require('./roles');
const { Model } = require('objection');

describe('Role model', function () {
  const role = new Role();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(role instanceof Model).toBeTruthy();
    expect(Role.tableName).toBe('roles');
    expect(typeof Role.relationMappings).toBe('object');
  });
});
