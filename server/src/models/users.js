const { Model } = require('objection');
const softDelete = require('objection-soft-delete');
const Role = require('./roles');

class User extends softDelete({ columnName: 'deleted' })(Model) {
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

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.login;
    delete json.password;
    delete json.deleted;
    delete json.deleted_at;
    return json;
  }
}

module.exports = User;
