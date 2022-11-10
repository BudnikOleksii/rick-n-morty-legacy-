const { getCharactersData } = require('../helpersAPI/get-characters-data');
const { getEpisodesData } = require('../helpersAPI/get-episodes-data');
const { getIdFromUrl } = require('../helpersAPI/get-id-from-url');

exports.seed = async function(knex) {
  await knex('characters_episodes').del();

  const charactersEpisodesData = [];
  const episodesIdsMap = new Map();
  const charactersIdsMap = new Map();

  const { charactersEpisodes } = await getCharactersData();
  const { episodesNamesMap } = await  getEpisodesData();

  (await knex.select('id', 'name')
    .from('episodes'))
    .forEach(data => {
      episodesIdsMap.set(data.name, data.id);
    });

  (await knex.select('id', 'name')
    .from('characters'))
    .forEach(data => {
      charactersIdsMap.set(data.name, data.id);
    });

  charactersEpisodes.forEach(([characterName, episodes]) => {
    episodes.forEach(episodeUrl => {
      const episodeName = episodesNamesMap.get(getIdFromUrl(episodeUrl));

      charactersEpisodesData.push({
        character_id: charactersIdsMap.get(characterName),
        episode_id: episodesIdsMap.get(episodeName),
      })
    })
  });

  await knex('characters_episodes').insert(charactersEpisodesData);
};
