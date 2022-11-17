const { Model } = require('objection');
const Species = require('./species');
const Type = require('./types');
const Location = require('./locations');

class Character extends Model {
  static get tableName() {
    return 'characters';
  }

  static relationMappings = {
    species: {
      relation: Model.BelongsToOneRelation,
      modelClass: Species,
      filter: query => query.select('name'),
      join: {
        from: 'characters.species_id',
        to: 'species.id',
      }
    },
    type: {
      relation: Model.BelongsToOneRelation,
      modelClass: Type,
      filter: query => query.select('name'),
      join: {
        from: 'characters.type_id',
        to: 'types.id',
      }
    },
    origin: {
      relation: Model.BelongsToOneRelation,
      modelClass: Location,
      filter: query => query.select('name'),
      join: {
        from: 'characters.origin_id',
        to: 'locations.id',
      }
    },
    location: {
      relation: Model.BelongsToOneRelation,
      modelClass: Location,
      filter: query => query.select('name'),
      join: {
        from: 'characters.location_id',
        to: 'locations.id',
      }
    },
  };

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.species_id;
    delete json.type_id;
    delete json.origin_id;
    delete json.location_id;
    delete json.created_at;
    delete json.deleted_at;
    return json;
  }
}

module.exports = Character;
