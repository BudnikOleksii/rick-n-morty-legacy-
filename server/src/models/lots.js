const { Model } = require('objection');
const Card = require('./cards');
const User = require('./users');
const objectionSoftDelete = require('objection-js-soft-delete').default;

const softDelete = objectionSoftDelete({
  columnName: 'activated',
  deletedValue: false,
  notDeletedValue: true,
});

class Lot extends softDelete(Model) {
  static get tableName() {
    return 'lots';
  }

  static relationMappings = {
    card: {
      relation: Model.BelongsToOneRelation,
      modelClass: Card,
      join: {
        from: 'lots.card_id',
        to: 'cards.id',
      }
    },
    lastPersonToBet: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'lots.last_person_to_bet_id',
        to: 'users.id',
      }
    },
  };

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.card_id;
    delete json.last_person_to_bet_id;
    return json;
  }
}

module.exports = Lot;
