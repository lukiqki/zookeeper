const express = require('express');
const animalsService = require('../services/AnimalsService');

const router = express.Router();

router.get('/', async (req, res) => {
    const animals = await animalsService.getAllAnimals();
    res.json(animals);
});

router.get('/:id', async (req, res) => {
    const animal = await animalsService.getAnimalById(req.params.id);
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).json({ error: 'Animal not found' });
    }
});

router.get('/endangered', async (req, res) => {
    const animals = await animalsService.getEndangeredAnimals();
    res.json(animals);
});

router.get('/habitat/:habitat', async (req, res) => {
    const animals = await animalsService.getAnimalsByHabitat(req.params.habitat);
    res.json(animals);
});

router.get('/species', async (req, res) => {
    const species = req.query.species;
    const animals = await animalsService.getAnimalsBySpecies(species);
    res.json(animals);
});

router.post('/', async (req, res) => {
    const newAnimal = req.body;
    const addedAnimal = await animalsService.addAnimal(newAnimal);
    res.status(201).json(addedAnimal);
});

router.put('/:id', async (req, res) => {
    const updatedAnimal = await animalsService.updateAnimal(req.params.id, req.body);
    if (updatedAnimal) {
        res.json(updatedAnimal);
    } else {
        res.status(404).json({ error: 'Animal not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const success = await animalsService.deleteAnimal(req.params.id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Animal not found' });
    }
});

module.exports = router;
