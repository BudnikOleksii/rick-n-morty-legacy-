const Lot = require('../models/lots');

const getAllLots = () => {
  return Lot.query()
    .select()
    .whereNotDeleted()
    .withGraphFetched('[card.[character.[species, type, origin, location, episodes], owner], lastPersonToBet]');
};

const getLots = (page, limit) => {
  return Lot.query()
    .select()
    .whereNotDeleted()
    .withGraphFetched('[card.[character.[species, type, origin, location, episodes], owner], lastPersonToBet]')
    .page(page - 1, limit);
};

const getLot = (columnName, value) => {
  return Lot.query()
    .whereNotDeleted()
    .withGraphFetched('[card.[character.[species, type, origin, location, episodes], owner], lastPersonToBet]')
    .findOne(columnName, value);
};

const createLot = async (payload) => {
  const newLot = await Lot.query().insert(payload);

  return getLot('id', newLot.id);
};

const updateLot = async (id, user, payload) => {
  const lot = await Lot.query().patchAndFetchById(id, payload);
  await lot
    .$relatedQuery('lastPersonToBet')
    .relate(user);

  return getLot('id', id);
};

const finishAuction = (id) => Lot.query().deleteById(id);

module.exports.LotsRepository = {
  getAllLots,
  getLots,
  getLot,
  createLot,
  updateLot,
  finishAuction,
};
