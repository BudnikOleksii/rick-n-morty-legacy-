const Card = require('../models/cards');

const getCards = (page, limit) => {
  return Card.query()
    .whereNotDeleted()
    .withGraphFetched('[character.[species, type, origin, location, episodes], owner]')
    .page(page - 1, limit);
};

const getCardById = (id) => Card.query().findById(id);

module.exports.CardsRepository = {
  getCards,
  getCardById,
};
