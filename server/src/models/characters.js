const { Model } = require('objection');
const Species = require('./species');
const Type = require('./types');
const Location = require('./locations');
const Episode = require('./episodes');
const Sets = require('./sets');

class Character extends Model {
  static get tableName() {
    return 'characters';
  }

  static relationMappings = {
    species: {
      relation: Model.BelongsToOneRelation,
      modelClass: Species,
      join: {
        from: 'characters.species_id',
        to: 'species.id',
      },
    },
    type: {
      relation: Model.BelongsToOneRelation,
      modelClass: Type,
      join: {
        from: 'characters.type_id',
        to: 'types.id',
      },
    },
    origin: {
      relation: Model.BelongsToOneRelation,
      modelClass: Location,
      join: {
        from: 'characters.origin_id',
        to: 'locations.id',
      },
    },
    location: {
      relation: Model.BelongsToOneRelation,
      modelClass: Location,
      join: {
        from: 'characters.location_id',
        to: 'locations.id',
      },
    },
    episodes: {
      relation: Model.ManyToManyRelation,
      modelClass: Episode,
      join: {
        from: 'characters.id',
        through: {
          from: 'characters_episodes.character_id',
          to: 'characters_episodes.episode_id',
        },
        to: 'episodes.id',
      },
    },
    sets: {
      relation: Model.ManyToManyRelation,
      modelClass: Sets,
      join: {
        from: 'characters.id',
        through: {
          from: 'sets_characters.character_id',
          to: 'sets_characters.set_id',
        },
        to: 'sets.id',
      },
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

    json.species = this.species.name;
    json.type = this.type.name;
    return json;
  }
}

module.exports = Character;
