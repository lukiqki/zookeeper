const express = require('express');
require('body-parser');
const animalsController = require('./controllers/AnimalsController');

const app = express();
const PORT = 3000;


app.use('/animals', animalsController);

app.listen(PORT, () => {
    console.log(`Zoo Keeper Express is running on http://localhost:${PORT}`);
});
