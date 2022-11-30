const express = require('express');
const config = require('../../config');
const { ChatsController } = require('../controllers/chats');
const { authGuard } = require('../middlewares/authGuard');
const { roleGuard } = require('../middlewares/roleGuard');
const { selfOrRoleGuard } = require('../middlewares/selfOrRoleGuard');
const { MessagesController } = require('../controllers/messages');

const { adminRole } = config.server;

const chatsRouter = express.Router();

chatsRouter.use(authGuard);
chatsRouter.get('/', ChatsController.getChats);
chatsRouter.get('/:id', ChatsController.getChat);
chatsRouter.get('/:id/messages', MessagesController.getChatMessages);
chatsRouter.post('/:id/messages', MessagesController.createMessage);
chatsRouter.patch('/:id/messages/:messageId', MessagesController.editMessage);
chatsRouter.delete('/:id/messages/:messageId', MessagesController.deleteMessage);
chatsRouter.post('/', roleGuard(adminRole), ChatsController.createChat);
chatsRouter.patch('/:id', selfOrRoleGuard(adminRole), ChatsController.toggleUserInChat);

module.exports = chatsRouter;
