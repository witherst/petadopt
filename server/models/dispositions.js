var express = require('express'),
    router = express.Router()

const { Client } = require('pg');
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false
    }
});
client.connect();

router.route('/')
    .get((req, res) => {
        const getQuery = `
            SELECT * FROM dispositions;
        `;

        client.query(getQuery)
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

router.route('/:id')
    // get specific pet profile's dispositions
    .get((req, res) => {
        const pet_id = parseInt(req.params.id)
        
        const getQuery = `
            SELECT dispositions.id, dispositions.disposition 
            FROM pet_dispositions
            INNER JOIN dispositions
            ON dispositions.id = pet_dispositions.disposition
            WHERE pet_id=($1);
        `;

        client.query(getQuery, [pet_id])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

module.exports = router;
