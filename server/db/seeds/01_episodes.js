const { getEpisodesData } = require('../helpersAPI/get-episodes-data');

exports.seed = async function(knex) {
  await knex('episodes').del();

  const episodes = await getEpisodesData();

  await knex('episodes').insert(episodes);
};
