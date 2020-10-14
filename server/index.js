const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
process.env.NODE_ENV != 'production' ? require('dotenv').config() : null;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
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

/*     POSTGRES DATABASE RIGHT HERE       */
const { Client, Pool } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
});

const pool = new Pool();

client.connect();
//
//const createquery = `
//    CREATE TABLE IF NOT EXISTS users(
//        email varchar,
//        firstname varchar,
//        lastname varchar,
//        age int
//    );
//`;
//
//client.query(createquery, (err, res) => {
//    if(err){
//        console.error(err);
//        return;
//    }
//    console.log("Table created;");
////    client.end();
//})
//
//// ON CONFLICT NO ACTION = don't insert duplicates. ONLY WORKS IF ONE OF THE FIELDS IS MARKED AS UNIQUE WHEN TABLE WAS CREATED (I think).
//const insertquery = `
//    INSERT INTO users (email, firstname, lastname, age)
//    VALUES ('johndoe@gmail.com', 'john', 'doe', 21) 
//    ON CONFLICT DO NOTHING
//`;
//
//// Example of using promises and async/await.
//client.query(insertquery)
//        .then(res => {
//            console.log('Data inserted!');
//        })
//        .catch(err => {
//            console.error(err);
//        })
//        .finally(() => {
//            client.end();
//        });

app.get('/api/getcustomers', (req, res) => {
    res.set('Content-Type', 'application/json');

    const retrievequery = `
        SELECT * 
        FROM users
    `;

    client.query(retrievequery)
            .then(data => {
                return data
            })
            .then(passed_data => {
                // Do something else with the data that was passed in if you want.
                //console.log(passed_data.rows);
                res.send(passed_data.rows)
            })
            .catch(err => {
                console.error(err);
                client.end();
            })
            .finally(() => {
                // Clean up. May need this eventually?
            });
 });

/*       END OF POSTGRES DATABASE STUFF            */

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