var express = require("express"),
  router = express.Router();

const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

router.route("/insert").post((req, res) => {
  const endpoint = req.body.endpoint;

  const insertQuery = `
        INSERT INTO photos (endpoint) VALUES ($1)
        RETURNING *;
    `;

  client
    .query(insertQuery, [endpoint])
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
