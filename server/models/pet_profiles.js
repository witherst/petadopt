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
    // get all pet profiles for a specified user
    .get((req, res) => {
        const creator_id = parseInt(req.params.id)
        const getQuery = `
            SELECT * FROM pet_profiles WHERE creator_id=($1)
        `;

        client.query(getQuery, [creator_id])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

router.route('/get')
    // get specific pet profile associated w/ user
    .post((req, res) => {
        const context = {
            creatorId: req.body.creatorId,
            externalPetId: req.body.externalPetId
        }
        const getQuery = `
            SELECT * FROM pet_profiles WHERE creator_id=($1) AND external_pet_id=($2)
        `;

        client.query(getQuery, [context.creatorId, context.externalPetId])
            .then(data => {
                console.log(data.rows)
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
        externalPetId: req.body.externalPetId,
        animalType: req.body.animalType,
        availability: req.body.availability,
        timestamp: req.body.timestamp,
        profileStatus: req.body.profileStatus
    }
    pet.location = isNaN(req.body.location) ? null : req.body.location
    pet.breed = isNaN(req.body.breed) ? null : req.body.breed
    pet.profilePicId = isNaN(parseInt(req.body.profilePicId)) ? null : parseInt(req.body.profilePicId)
    pet.age= isNaN(parseInt(req.body.age)) ? null : parseInt(req.body.age)

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
                profile_status
            ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
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
            pet.profileStatus
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
