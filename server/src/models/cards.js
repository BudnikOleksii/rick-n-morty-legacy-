const { Model } = require('objection');
const Character = require('./characters');
const User = require('./users');
const objectionSoftDelete = require('objection-js-soft-delete').default;

const softDelete = objectionSoftDelete({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});

class Card extends softDelete(Model) {
  static get tableName() {
    return 'cards';
  }

  static relationMappings = {
    character: {
      relation: Model.BelongsToOneRelation,
      modelClass: Character,
      join: {
        from: 'cards.character_id',
        to: 'characters.id',
      }
    },
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'cards.owner_id',
        to: 'users.id',
      }
    },
  };

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.character_id;
    delete json.owner_id;
    delete json.created_at;
    delete json.deleted_at;
    return json;
  }
}

module.exports = Card;
