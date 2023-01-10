const mockAdminRole = { id: 1, title: 'admin' };
const mockUserRole = { id: 2, title: 'user' };
const mockRoles = [mockAdminRole, mockUserRole];

const mockIp = '127.0.0.1';
const mockNewDate = '2023-01-06T15:37:17.810Z';
const mockUserFromDB = {
  id: 1,
  username: 'admin',
  login: 'admin@gmail.com',
  password: 'password',
  rating: 0,
  registration_date: '2022-12-26T07:20:51.000Z',
  last_visit_date: '2023-01-04T11:24:33.000Z',
  ip: '127.0.0.1',
  activated: false,
  deleted_at: null,
  stripe_account_id: null,
  roles: [mockAdminRole],
  activation_link: '12345678',
  balance: 0,
};

const mockChat = { id: 1, name: 'Rick and Morty main', users: [mockUserFromDB] };
const mockChats = [mockChat];

const mockUsers = [mockUserFromDB];

const mockUsersFromDB = {
  results: mockUsers,
  total: 1,
};

const mockNewUserData = {
  username: 'user',
  login: 'user@gmail.com',
  password: '12345678',
};

const mockNewUser = {
  ...mockNewUserData,
  id: 2,
  ip: mockIp,
  activation_link: 'root',
  activated: false,
  deleted_at: null,
  stripe_account_id: null,
  roles: [mockUserRole],
  balance: 0,
};

const mockFindUserById = (id) => mockUsers.find((user) => user.id === id);

module.exports.UserRepository = {
  getAllUsers: jest.fn(() => mockUsersFromDB),
  getExistingUser: jest.fn(
    (columnName, value) => mockUsers.find((user) => user[columnName] === value) || null
  ),
  createUser: jest.fn(() => mockNewUser),
  updateUser: jest.fn((id, payload) => {
    const user = mockUsers.find((user) => user.id === id);

    return user ? { ...user, ...payload } : null;
  }),
  deleteUser: jest.fn((id) => (mockUsers.find((user) => user.id === id) ? 1 : 0)),
  addNewRole: jest.fn((user, roleTitle) => {
    const currentRole = mockRoles.find((role) => role.title === roleTitle);

    if (currentRole) {
      user.roles.push(currentRole);
    }

    return user;
  }),
  updateLastSeen: jest.fn(async (id, ip) => {
    const user = mockFindUserById(id);

    return {
      ...user,
      last_visit_date: mockNewDate,
    };
  }),
  getUserChats: jest.fn((id) => {
    const user = mockFindUserById(id);

    if (user) {
      const chats = mockChats
        .filter((chat) => chat.users.some((user) => user.id === id))
        .map((chat) => ({ id: chat.id, name: chat.name }));

      return {
        ...user,
        chats,
      };
    }
  }),
  mockData: {
    mockUsers,
    mockNewUser,
    mockNewDate,
    mockNewUserData,
    mockUserFromDB,
    mockIp,
    mockUsersFromDB,
  },
};
