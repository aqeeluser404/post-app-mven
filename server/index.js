const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

// Handle production
if(process.env.NODE_ENV === 'production') {
    // static-build folder
    app.use(express.static(__dirname + '/public/'));

    // Handle Single-Page Application
    // send the backend routes to the public folder specified by the frontend
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// listen for port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));