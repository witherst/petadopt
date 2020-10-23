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
    // get all users & user data from users table
    .get((req, res) => {
        res.set('Content-Type', 'application/json');

        const getQuery = `
            SELECT * 
            FROM users
        `;
        client.query(getQuery)
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

router.route('/:email')
    // get user data for specified email
    .get((req, res) => {
        const email = req.params.email
        console.log(email)
        const getQuery = `
            SELECT * FROM users WHERE email=($1)
        `;

        client.query(getQuery, [email])
            .then(data => {
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })

// insert new user in table and return the user data
router.route('/insert').post((req, res) => {
        // console.log(req)
        var user = {
            email: req.body.email,
            username: req.body.username,
            isAdmin: req.body.isAdmin,
            isCreator: req.body.isCreator,
        };
        user.profilePicId = isNaN(parseInt(req.body.profilePicId)) ? null : parseInt(req.body.profilePicId)
        console.log(user)

        const insertQuery = `
            INSERT INTO users (email, username, is_admin, is_creator, profile_pic_id) 
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        client.query(insertQuery, [user.email, user.username, user.isAdmin, user.isCreator, user.profilePicId])
            .then(data => {
                console.log("user added to db: " + data.rows);
                res.send(data.rows)
            })
            .catch(err => {
                console.error(err);
            })
    })
    
module.exports = router;
