const router = require('express').Router();

const Car = require('./cars-model');

const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');

router.get('/', (req, res, next) => {
    Car.getAll()
        .then(cars => res.json(cars))
        .catch(next);
});

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.car);
});

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    Car.create(req.body)
        .then(car => res.json(car))
        .catch(next);
});

module.exports = router;
