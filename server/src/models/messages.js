const { Model } = require('objection');
const Chat = require('./chats');
const User = require('./users');
const objectionSoftDelete = require('objection-js-soft-delete').default;

const softDelete = objectionSoftDelete({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});

class Message extends softDelete(Model) {
  static get tableName() {
    return 'messages';
  }

  static relationMappings = {
    chat: {
      relation: Model.BelongsToOneRelation,
      modelClass: Chat,
      join: {
        from: 'messages.chat_id',
        to: 'chats.id',
      }
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'messages.user_id',
        to: 'users.id',
      }
    },
  };

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

module.exports = Message;
