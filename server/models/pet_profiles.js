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

// query for existing matching petname for user
// router.route('/verify')
router.route('/verify/:user_id/:pet_name')
    .get((req, res) => {
        const context = {
            userId: req.params.user_id,
            petName: req.params.pet_name,
        }

        const getQuery = `
            SELECT * FROM pet_profiles WHERE creator_id=($1) AND external_pet_id=($2);
        `;

        client.query(getQuery, [context.userId, context.petName])
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
