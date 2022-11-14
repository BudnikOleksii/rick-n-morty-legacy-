const { Model } = require('objection');
const Role = require('./roles');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static relationMappings = {
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: Role,
      join: {
        from: 'users.id',
        through: {
          from: 'users_roles.user_id',
          to: 'users_roles.role_id'
        },
        to: 'roles.id'
      }
    }
  };
}

module.exports = User;
