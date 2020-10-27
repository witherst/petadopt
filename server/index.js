const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
process.env.NODE_ENV != 'production' ? require('dotenv').config() : null;

// express app
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/*     POSTGRES DATABASE RIGHT HERE       */
const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

client.connect();

/**
 * APIs
 */
// routes
var usersRouter = require('./models/user'),
    petProfilesRouter = require('./models/pet_profiles')

app.use('/api/user', usersRouter)
app.use('/api/pet', petProfilesRouter)

// Production environment modules
if(process.env.NODE_ENV === 'production'){

    // Serve any static file
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
    app.use(morgan('common'));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../react-ui/build/', 'index.html'));    // Send our index to anyone trying to access our website
    })
} else {
    app.use(morgan('dev'));
}

app.listen(port, err => {
    if (err) throw err    
    console.log(`Server started on port ${port}! Awesome!`);
});