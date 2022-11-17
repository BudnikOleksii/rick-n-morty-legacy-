exports.seed = async function(knex) {
  await knex('users_roles').del();

  const adminsRoleId = await knex
    .select('id')
    .from('roles')
    .where('title', 'admin');

  const usersRoleId = await knex
    .select('id')
    .from('roles')
    .where('title', 'user');

  const usersData = await knex
    .select('id')
    .from('users');

  const admin = {
    user_id: usersData[0].id,
    role_id: adminsRoleId[0].id,
  };

  const user = {
    user_id: usersData[1].id,
    role_id: usersRoleId[0].id,
  };

  await knex('users_roles').insert([admin, user]);
};
