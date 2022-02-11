const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
}

const getById = (id) => {
  return db('cars').where('id', id).first();
}

const create = async (car) => {
  const [id] = await db('cars').insert(car);
  return getById(id);
}

const getVin = (vin) => {
  return db('cars').where({ vin }).first()
}

module.exports = {
  getAll,
  getById,
  create,
  getVin,
};
