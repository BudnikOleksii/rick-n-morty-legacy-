const { Model } = require('objection');
const User = require('./users');

class Token extends Model {
  static get tableName() {
    return 'tokens';
  }

  static relationMappings = {
    users: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: 'user_id',
        to: 'users.id'
      }
    }
  };

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.created_at;
    delete json.updated_at;
    return json;
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

module.exports = Token;
