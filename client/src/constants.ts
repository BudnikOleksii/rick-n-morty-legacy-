export const PATHS = {
  registration: '/registration',
  login: '/login',
  users: '/users',
  cards: '/cards',
  characters: '/characters',
  sets: '/sets',
  lots: '/lots',
  chats: '/chats',
  transactions: '/transactions',
};

export const ADMIN_ROLE = 'admin';
export const DEFAULT_MAX_PRICE = 2 ** 31 - 1;
export const MATERIAL_NAV_Z_INDEX = 1100;
export const SOCKET_EVENTS = {
  join: 'joinRoom',
  send: 'sendMessage',
  receive: 'receiveMessage',
  usersOnlineInfo: 'usersOnlineInfo',
};
