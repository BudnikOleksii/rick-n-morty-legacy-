exports.seed = async function(knex) {
  await knex('cards').del();

  const cardsData = (await knex.select('id').from('characters')).map(character => ({
    character_id: character.id,
  }));

  await knex('cards').insert(cardsData);
};
