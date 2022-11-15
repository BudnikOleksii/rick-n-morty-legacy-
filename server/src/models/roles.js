const { Model } = require('objection');
const User = require('./users');

class Role extends Model {
  static get tableName() {
    return 'roles';
  }

  static relationMappings = {
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'roles.id',
        through: {
          from: 'users_roles.role_id',
          to: 'users_roles.user_id'
        },
        to: 'users.id'
      }
    }
  };
}

module.exports = Role;
