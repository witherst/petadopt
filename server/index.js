const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    console.log("Sending back to client");
    res.send({message: 'Hello from the custom server!'});
  });

/* TEST API HOOK. WE WOULD GET THE "CUSTOMER" VALUES FROM OUR DB. */
app.get('/api/customers', (req, res) => {
    res.set('Content-Type', 'application/json');
    const customers = [
        {id: 1, firstName: 'Yvonne', lastName: 'MARCIINKKKKYYY'},
        {id: 2, firstName: 'Tim', lastName: 'WITHERRRSSS'},
        {id: 3, firstName: 'Jenny', lastName: 'HUUUANNGGG'}
    ];

    res.json(customers);
})

// Production environment modules
if(process.env.NODE_ENV === 'production'){

    // Serve any static files
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