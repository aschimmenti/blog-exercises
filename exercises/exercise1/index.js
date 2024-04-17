const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "HTML" directory
app.use(express.static(path.join(__dirname, 'html')));

app.get('/', (req, res) => {
    res.send('Hello World'); 
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'hello.html')); 
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
