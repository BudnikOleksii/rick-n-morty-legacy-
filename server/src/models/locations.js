const { Model } = require('objection');

class Location extends Model {
  static get tableName() {
    return 'locations';
  }

  static get relationMappings() {
    const Character = require('./characters');

    return {
      residents: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: 'locations.id',
          through: {
            from: 'locations_characters.location_id',
            to: 'locations_characters.character_id'
          },
          to: 'characters.id'
        }
      }
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.created_at;
    delete json.deleted_at;
    return json;
  }
}

module.exports = Location;
