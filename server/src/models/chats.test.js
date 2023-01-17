const Chat = require('./chats');
const { Model } = require('objection');

describe('Chat model', function () {
  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    const chat = new Chat();
    expect(chat instanceof Model).toBeTruthy();
    expect(Chat.tableName).toBe('chats');
    expect(typeof Chat.relationMappings).toBe('object');
  });
});
