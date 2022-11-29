const { Model } = require('objection');
const Role = require('./roles');
const Chat = require('./chats');
const objectionSoftDelete = require('objection-js-soft-delete').default;

const softDelete = objectionSoftDelete({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});

class User extends softDelete(Model) {
  static get tableName() {
    return 'users';
  }

  static relationMappings = {
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: Role,
      join: {
        from: 'users.id',
        through: {
          from: 'users_roles.user_id',
          to: 'users_roles.role_id'
        },
        to: 'roles.id'
      }
    },
    chats: {
      relation: Model.ManyToManyRelation,
      modelClass: Chat,
      join: {
        from: 'users.id',
        through: {
          from: 'users_chats.user_id',
          to: 'users_chats.chat_id'
        },
        to: 'chats.id'
      }
    }
  };

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.login;
    delete json.password;
    delete json.deleted_at;
    return json;
  }

  $beforeUpdate() {
    this.last_visit_date = new Date();
  }
}

module.exports = User;
