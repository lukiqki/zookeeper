const express = require('express');
const bodyParser = require('body-parser');
const animalsController = require('./controllers/AnimalsController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/animals', animalsController);

app.listen(PORT, () => {
    console.log(`Zoo Keeper Express is running on http://localhost:${PORT}`);
});
