const { getEpisodesData } = require('../helpersAPI/getEpisodesData');

exports.seed = async function(knex) {
  await knex('episodes').del();

  const episodes = await getEpisodesData();

  await knex('episodes').insert(episodes);
};
