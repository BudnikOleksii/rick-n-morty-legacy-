const { Model } = require('objection');
// const User = require('./users');

class Location extends Model {
  static get tableName() {
    return 'locations';
  }

  // static relationMappings = {
  //   users: {
  //     relation: Model.ManyToManyRelation,
  //     modelClass: User,
  //     join: {
  //       from: 'roles.id',
  //       through: {
  //         from: 'users_roles.role_id',
  //         to: 'users_roles.user_id'
  //       },
  //       to: 'users.id'
  //     }
  //   }
  // };

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.created_at;
    delete json.deleted_at;
    return json;
  }
}

module.exports = Location;
