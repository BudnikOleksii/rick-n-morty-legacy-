const { Model } = require('objection');
const BaseModel = require('./base-model');

class Set extends BaseModel {
  static get tableName() {
    return 'sets';
  }

  static get relationMappings() {
    const Character = require('./characters');

    return {
      characters: {
        relation: Model.ManyToManyRelation,
        modelClass: Character,
        join: {
          from: 'sets.id',
          through: {
            from: 'sets_characters.set_id',
            to: 'sets_characters.character_id',
          },
          to: 'characters.id',
        },
      },
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.created_at;
    delete json.deleted_at;
    return json;
  }
}

module.exports = Set;
