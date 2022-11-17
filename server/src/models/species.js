const { Model } = require('objection');

class Species extends Model {
  static get tableName() {
    return 'species';
  }
}

module.exports = Species;
