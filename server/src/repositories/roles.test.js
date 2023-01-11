const Role = require('../models/__mocks__/roles');
const { RoleRepository } = require('./roles');

jest.mock('../models/roles');

describe('getRole', function () {
  it('should return role find by title', function () {
    const role = RoleRepository.getRole(Role.mockRole.title);
    expect(role).toStrictEqual(Role.mockRole);
  });
});
