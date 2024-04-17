const express = require('express');
const app = express();

app.set('view engine', 'ejs'); // Sets EJS as the templating engine

// Define the route that renders an EJS template
app.get('/', (req, res) => {
    const today = new Date(); // Get today's date
    res.render('home', { date: today.toDateString() }); // Pass the date to the EJS template
});

app.get('/greet', (req, res) => {
    const user = "Visitor";
    res.render('greeting', { name: user }); // Passes the variable 'name' to the view
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
