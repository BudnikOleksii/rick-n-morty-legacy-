const express = require('express');
const config = require('../../config');
const { ChatsController } = require('../controllers/chats');
const { authGuard } = require('../middlewares/authGuard');
const { roleGuard } = require('../middlewares/roleGuard');
const { selfOrRoleGuard } = require('../middlewares/selfOrRoleGuard');

const { adminRole } = config.server;

const chatsRouter = express.Router();

chatsRouter.use(authGuard);
chatsRouter.get('/', ChatsController.getChats);
chatsRouter.get('/:id', ChatsController.getChat);
chatsRouter.post('/', roleGuard(adminRole), ChatsController.createChat);
chatsRouter.patch('/:id', selfOrRoleGuard(adminRole), ChatsController.toggleUserInChat);

module.exports = chatsRouter;
