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


// get all pets based on disposition
router.route('/pets/:id')
    .get((req, res) => {
        const id = parseInt(req.params.id)
        const getQuery = `
            SELECT * FROM pet_dispositions 
            INNER JOIN pet_profiles
            ON pet_dispositions.pet_id = pet_profiles.internal_pet_id

            WHERE disposition=($1)
            ORDER BY last_updated_timestamp;
        `;
        client.query(getQuery, [id])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

module.exports = router;
