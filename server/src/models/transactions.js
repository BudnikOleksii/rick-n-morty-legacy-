const { Model } = require('objection');
const Lot = require('./lots');
const User = require('./users');

class Transaction extends Model {
  static get tableName() {
    return 'transactions';
  }

  static relationMappings = {
    lot: {
      relation: Model.BelongsToOneRelation,
      modelClass: Lot,
      join: {
        from: 'transactions.lot_id',
        to: 'lots.id',
      },
    },
    seller: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'transactions.seller_id',
        to: 'users.id',
      },
    },
    purchaser: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'transactions.purchaser_id',
        to: 'users.id',
      },
    },
  };
}

module.exports = Transaction;
