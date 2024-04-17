const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Route for the input form
app.get('/', (req, res) => {
    const today = new Date(); // Get today's date
    res.render('home', { date: today.toDateString() }); // Pass the date to the EJS template
});

app.get('/form', (req, res) => {
    res.render('form');
});

// Route to handle form submission and display results
app.post('/submit', (req, res) => {
    const { string1, string2, string3 } = req.body;
    const concatenated = `${string1} ${string2} ${string3}`;
    const strings = [string1, string2, string3];
    res.render('result', { concatenated: concatenated, strings: strings });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
