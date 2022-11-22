const Lot = require('../models/lots');

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

module.exports.LotsRepository = {
  getLots,
  getLot,
  createLot,
};
