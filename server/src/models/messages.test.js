const Message = require('./messages');
const { Model } = require('objection');

describe('Message model', function () {
  const message = new Message();

  it('should be instance of objection Model class and have static getters tableName and relationMappings', function () {
    expect(message instanceof Model).toBeTruthy();
    expect(Message.tableName).toBe('messages');
    expect(typeof Message.relationMappings).toBe('object');
    expect(typeof message.$beforeUpdate).toBe('function');
  });

  it('should set date to our message updated_at field', function () {
    message.$beforeUpdate();
    expect(message.updated_at.getDate()).toBe(new Date().getDate());
  });
});
