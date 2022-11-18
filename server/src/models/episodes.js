const { Model } = require('objection');

class Episode extends Model {
  static get tableName() {
    return 'episodes';
  }

  static get relationMappings() {
    const Character = require('./characters');

    return {
      characters: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: 'episodes.id',
          through: {
            from: 'characters_episodes.episode_id',
            to: 'characters_episodes.character_id'
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

module.exports = Episode;
