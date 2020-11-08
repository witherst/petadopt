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
    // get all pet profiles & data from pet_profiles table
    .get((req, res) => {
        res.set('Content-Type', 'application/json');

        const getQuery = `
            SELECT * 
            FROM pet_profiles
            ORDER BY last_updated_timestamp;
        `;
        client.query(getQuery)
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

router.route('/user/:id')
    // get all pet profiles for a specified user
    .get((req, res) => {
        const creator_id = parseInt(req.params.id)
        const getQuery = `
            SELECT * FROM pet_profiles WHERE creator_id=($1)
            ORDER BY last_updated_timestamp;
        `;

        client.query(getQuery, [creator_id])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

router.route('/:id')
    // get specific pet profile
    .get((req, res) => {
        const internal_pet_id = parseInt(req.params.id)
        
        const getQuery = `
            SELECT * FROM pet_profiles WHERE internal_pet_id=($1)
        `;

        client.query(getQuery, [internal_pet_id])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

// select animals based on color
router.route('/color/:color')
    .get((req, res) => {
        const color = req.params.color
        const getQuery = `
            SELECT * FROM pet_profiles WHERE color=($1)
            ORDER BY last_updated_timestamp;
        `

        client.query(getQuery, [color])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

// select animals based on breed
router.route('/breed/:breed')
    .get((req, res) => {
        const breed = req.params.breed
        const getQuery = `
            SELECT * FROM pet_profiles WHERE breed=($1)
            ORDER BY last_updated_timestamp;
        `

        client.query(getQuery, [breed])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

// select animals based on animal type
router.route('/type/:type')
    .get((req, res) => {
        const type = req.params.type
        const getQuery = `
            SELECT * FROM pet_profiles WHERE animal_type=($1)
            ORDER BY last_updated_timestamp;
        `

        client.query(getQuery, [type])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

// select animals based last updated time
router.route('/date/:date')
    .get((req, res) => {
        const date = req.params.date
        const getQuery = `
            SELECT * FROM pet_profiles WHERE last_updated_timestamp LIKE ($1)
            ORDER BY last_updated_timestamp;
        `
        console.log('date ' + date)
        client.query(getQuery, [date + '%'])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

// insert pet profile in table and return the data
router.route('/insert').post((req, res) => {
    var pet = {
        creatorId: parseInt(req.body.creatorId),
        externalPetId: req.body.petName,
        animalType: req.body.animalType,
        location: req.body.location,
        breed: req.body.breed,
        color: req.body.color,
        size: req.body.size,
        sex: req.body.sex,
        story: req.body.story,
        availability: req.body.availability,
        timestamp: new Date().toISOString(),
        profileStatus: 'Active'
    }
    pet.age = isNaN(req.body.age) ? null : parseInt(req.body.age)
    pet.weight = isNaN(req.body.weight) ? null : parseInt(req.body.weight)
    pet.profilePicId = isNaN((req.body.profilePicId)) ? null : parseInt(req.body.profilePicId)

    console.log(pet)
    const insertQuery = `
        INSERT INTO pet_profiles (
                external_pet_id, 
                creator_id, 
                animal_type, 
                breed, 
                age_in_months, 
                location, 
                availability, 
                last_updated_timestamp, 
                profile_pic_id,
                profile_status,
                color,
                size,
                sex,
                weight,
                story
            ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *;
    `;

    client.query(insertQuery,
        [
            pet.externalPetId,
            pet.creatorId,
            pet.animalType,
            pet.breed,
            pet.age,
            pet.location,
            pet.availability,
            pet.timestamp,
            pet.profilePicId,
            pet.profileStatus,
            pet.color,
            pet.size,
            pet.sex,
            pet.weight,
            pet.story
        ]
    )
        .then(data => {
            res.send(data.rows[0])
        })
        .catch(err => {
            console.error(err);
        })
    })
    
module.exports = router;
