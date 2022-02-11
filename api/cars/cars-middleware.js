const Car = require('./cars-model');
const vinValidator = require('vin-validator');
const yup = require('yup');

const checkCarId = (req, res, next) => {
  Car.getById(req.params.id)
    .then(possibleCar => {
      possibleCar ? (req.car = possibleCar, next()) : res.status(404).json({ message: `car with id ${req.params.id} is not found` })
    })
    .catch(next)
}

const carSchema = yup.object({
  vin: yup.string().required("vin is missing"),
  make: yup.string().required("make is missing"),
  model: yup.string().required("model is missing"),
  mileage: yup.number().required("mileage is missing")
});

const checkCarPayload = async (req, res, next) => {
  try {
    const validCar = await carSchema.validate(req.body, {
      stripUnknown: true,
    });
    req.body = validCar;
    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

const checkVinNumberValid = (req, res, next) => {
  const validVin = vinValidator.validate(req.body.vin);
  validVin ? next() : res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
}

const checkVinNumberUnique = (req, res, next) => {
  Car.getVin(req.body.vin)
    .then(car => car ? res.status(400).json({ message: `vin ${req.body.vin} already exists` }) : next())
    .catch(next)
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
