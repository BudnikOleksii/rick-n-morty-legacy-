const { Model } = require('objection');

class Chat extends Model {
  static get tableName() {
    return 'chats';
  }

  static get relationMappings() {
    const User = require('./users');

    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'chats.id',
          through: {
            from: 'users_chats.chat_id',
            to: 'users_chats.user_id'
          },
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = Chat;
