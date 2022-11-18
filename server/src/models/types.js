const { Model } = require('objection');

class Type extends Model {
  static get tableName() {
    return 'types';
  }
}

module.exports = Type;
