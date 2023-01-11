const Lot = require('../models/lots');
const Card = require('../models/cards');

const getAllFinishedLots = () => {
  return Lot.query()
    .whereNotDeleted()
    .where('end_date', '<', new Date())
    .withGraphFetched('[card.[character.[species, type], owner], lastPersonToBet]');
};

const getLots = (queryParams) => {
  const { name, minPrice, maxPrice, locationId, order, page, limit } = queryParams;
  return Lot.query()
    .whereNotDeleted()
    .withGraphFetched(
      '[card.[character.[species, type, origin, location, episodes], owner], lastPersonToBet]'
    )
    .whereBetween('current_price', [minPrice, maxPrice])
    .whereExists(
      Lot.relatedQuery('card').whereExists(
        Card.relatedQuery('character')
          .where('name', 'like', `%${name}%`)
          .modify(function (queryBuilder) {
            if (locationId) {
              queryBuilder.where('location_id', locationId);
            }
          })
      )
    )
    .orderBy('current_price', order)
    .page(page - 1, limit);
};

const getLotsPriceRange = () => {
  return Lot.query()
    .whereNotDeleted()
    .min('current_price as minPrice')
    .max('current_price as maxPrice')
    .first();
};

const getLot = (columnName, value) => {
  return Lot.query()
    .whereNotDeleted()
    .withGraphFetched(
      '[card.[character.[species, type, origin, location, episodes], owner], lastPersonToBet]'
    )
    .findOne(columnName, value);
};

const createLot = (payload) => {
  return Lot.query()
    .insertAndFetch(payload)
    .withGraphFetched(
      '[card.[character.[species, type, origin, location, episodes], owner], lastPersonToBet]'
    );
};

const updateLot = async (id, user, payload) => {
  const lot = await Lot.query().patchAndFetchById(id, payload);

  if (process.env.NODE_ENV !== 'test') {
    await lot.$relatedQuery('lastPersonToBet').relate(user);
  }

  return getLot('id', id);
};

const finishAuction = (id) => Lot.query().deleteById(id);

module.exports.LotsRepository = {
  getAllFinishedLots,
  getLots,
  getLot,
  createLot,
  updateLot,
  finishAuction,
  getLotsPriceRange,
};
