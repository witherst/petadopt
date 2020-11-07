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
    // get all petmarks
    .get((req, res) => {
        res.set('Content-Type', 'application/json');

        const getQuery = `
            SELECT * FROM petmarks 
            INNER JOIN pet_profiles 
            ON pet_profiles.internal_pet_id = petmarks.pet_id;
        `;
        client.query(getQuery)
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

router.route('/state')
    .get((req, res) => {
        const petmark = {
            user_id: parseInt(req.query.user_id),
            pet_id: parseInt(req.query.pet_id)
        }

        const getQuery = `
            SELECT * FROM petmarks WHERE user_id=($1) AND pet_id=($2)
        `;

        client.query(getQuery, [petmark.user_id, petmark.pet_id])
            .then(data => {
                if (data.rows[0]) {
                    res.send(true)
                } else {
                    res.send(false)
                }
            })
            .catch(err => {
                console.error(err);
            })
    })
    .post((req, res) => {
        const petmark = {
            userId: parseInt(req.body.userId),
            petId: parseInt(req.body.petId)
        }

        const insertQuery = `
            INSERT INTO petmarks (
                    user_id, pet_id
                ) 
            VALUES ($1, $2)
            RETURNING *
        `;

        client.query(insertQuery,
            [
                petmark.userId,
                petmark.petId,
            ]
        )
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })
    .delete((req, res) => {
        const petmark = {
            userId: parseInt(req.body.userId),
            petId: parseInt(req.body.petId)
        }

        const insertQuery = `
            DELETE FROM petmarks 
            WHERE user_id=($1) AND pet_id=($2)
        `;

        client.query(insertQuery,
            [
                petmark.userId,
                petmark.petId,
            ]
        )
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

router.route('/statuses/:id')
    // get user petmarks
    .get((req, res) => {
        const id = parseInt(req.params.id)
        const getQuery = `
            SELECT petmarks.pet_id, statuses.status_id, timestamp, status FROM petmarks
 			INNER JOIN pet_statuses ON petmarks.pet_id = pet_statuses.pet_id
			INNER JOIN statuses ON pet_statuses.status_id = statuses.status_id
            WHERE petmarks.user_id = ($1)
			ORDER BY timestamp;
        `;

        client.query(getQuery, [id])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

router.route('/insert').post((req, res) => {
    var petmark = {
        userId: parseInt(req.body.userId),
        petId: parseInt(req.body.petId)
    }

    const insertQuery = `
        INSERT INTO petmarks (
                user_id, pet_id
            ) 
        VALUES ($1, $2)
        RETURNING *
    `;

    client.query(insertQuery,
        [
            petmark.userId,
            petmark.petId,
        ]
    )
        .then(data => {
            res.send(data.rows)
        })
        .catch(err => {
            console.error(err);
        })
})

module.exports = router;
