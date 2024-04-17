const express = require('express');
const app = express();

// Sets up a basic route that sends a response directly to the client
app.get('/', (req, res) => {
    res.send('Welcome to our simple Express server!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
