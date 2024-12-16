const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/zoo.json');

const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

module.exports = {
    getAllAnimals: async () => {
        return readData();
    },

    getAnimalById: async (id) => {
        const animals = readData();
        return animals.find((animal) => animal.id === parseInt(id));
    },

    getEndangeredAnimals: async () => {
        const animals = readData();
        return animals.filter((animal) => animal.isEndangered);
    },

    getAnimalsByHabitat: async (habitat) => {
        const animals = readData();
        return animals.filter((animal) => animal.habitat.toLowerCase() === habitat.toLowerCase());
    },

    getAnimalsBySpecies: async (species) => {
        const animals = readData();
        return animals.filter((animal) => animal.species.toLowerCase() === species.toLowerCase());
    },

    addAnimal: async (newAnimal) => {
        const animals = readData();
        const newId = animals.length ? Math.max(...animals.map((a) => a.id)) + 1 : 1;
        const animal = { id: newId, ...newAnimal };
        animals.push(animal);
        writeData(animals);
        return animal;
    },

    updateAnimal: async (id, updates) => {
        const animals = readData();
        const index = animals.findIndex((animal) => animal.id === parseInt(id));
        if (index !== -1) {
            animals[index] = { ...animals[index], ...updates };
            writeData(animals);
            return animals[index];
        }
        return null;
    },

    deleteAnimal: async (id) => {
        const animals = readData();
        const index = animals.findIndex((animal) => animal.id === parseInt(id));
        if (index !== -1) {
            animals.splice(index, 1);
            writeData(animals);
            return true;
        }
        return false;
    }
};
