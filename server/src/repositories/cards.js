const Card = require('../models/cards');

const getCards = (page, limit) => {
  return Card.query()
    .whereNotDeleted()
    .withGraphFetched('[character.[species, type, origin, location, episodes], owner]')
    .page(page - 1, limit);
};

const getCardById = (id) => {
  return Card.query()
    .whereNotDeleted()
    .withGraphFetched('[character.[species, type, origin, location, episodes], owner]')
    .findById(id);
};

const createCard = (character) => {
  return Card.query()
    .insertAndFetch({ character_id: character.id })
    .withGraphFetched('[character.[species, type, origin, location, episodes], owner]');
};

const changeOwner = async (card, owner) => {
  await card.$relatedQuery('owner').relate(owner);

  return getCardById(card.id);
};

const getUserCards = (page, limit, userId) => {
  return Card.query()
    .whereNotDeleted()
    .where('owner_id', userId)
    .withGraphFetched('[character.[species, type, origin, location, episodes, sets], owner]')
    .page(page - 1, limit);
};

const getAllUserCards = (userId) => {
  return Card.query()
    .whereNotDeleted()
    .where('owner_id', userId)
    .withGraphFetched('[character.[species, type]]');
};

module.exports.CardsRepository = {
  getCards,
  getCardById,
  getUserCards,
  getAllUserCards,
  createCard,
  changeOwner,
};
