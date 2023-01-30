const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/menu', (req, res) => {
    fs.readFile(path.join(__dirname, '../data/menu.json'), (err, data) => {
        if (err) res.status(400).send(err);
        res.send(JSON.parse(data)); 
    });
});

app.post('/payment', (req, res) => {
    // Validate payment here - TODO add actual validation of payment information

    if (req.body) {
        res.status(200).send();
    } else {
        res.status(400).send();
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));