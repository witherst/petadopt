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

const insert_pet_status = (status) => {
  const insertQuery = `
        INSERT INTO pet_statuses (
            pet_id, status_id
            )
        VALUES ($1, $2)
        ;
    `;
  client
    .query(insertQuery, [status.petId, status.statusId])
    .then()
    .catch((err) => {
      console.error(err);
    });
};

const update_pet_profile_timestamp = (updateParams) => {
  const updateQuery = `
        UPDATE pet_profiles
            SET last_updated_timestamp=($1)
            WHERE internal_pet_id=($2)
            RETURNING *;
    `;
  client
    .query(updateQuery, [updateParams.timestamp, updateParams.petId])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.error(err);
    });
};

router
  .route("/")
  // get all statuses
  .get((req, res) => {
    res.set("Content-Type", "application/json");

    const getQuery = `
            SELECT 
                pet_profiles.internal_pet_id, 
                pet_profiles.external_pet_id, 
                pet_statuses.pet_id, 
                statuses.status_id,
                statuses.status,
                statuses.timestamp,
                pet_profiles.profile_pic_id,
                photos.endpoint
            FROM pet_statuses
                INNER JOIN statuses 
                ON statuses.status_id = pet_statuses.status_id
                INNER JOIN pet_profiles
                ON pet_statuses.pet_id = pet_profiles.internal_pet_id
                LEFT JOIN photos
                ON photos.internal_pic_id=pet_profiles.profile_pic_id
            ORDER BY statuses.timestamp DESC;
        `;
    client
      .query(getQuery)
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        console.error(err);
      });
  });

router
  .route("/creator/:id")
  // get statuses of all pets belonging to creator
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const getQuery = `
            SELECT 
              pet_profiles.internal_pet_id, 
              pet_profiles.external_pet_id, 
              statuses.status_id,
              statuses.status,
              statuses.timestamp,
              pet_profiles.profile_pic_id,
              photos.endpoint
            FROM pet_profiles
              INNER JOIN pet_statuses ON pet_statuses.pet_id = pet_profiles.internal_pet_id
              INNER JOIN statuses ON pet_statuses.status_id = statuses.status_id
              LEFT JOIN photos ON photos.internal_pic_id=pet_profiles.profile_pic_id
              WHERE pet_profiles.creator_id = ($1)
              ORDER BY timestamp DESC;
        `;

    client
      .query(getQuery, [id])
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        console.error(err);
      });
  });

router
  .route("/:id")
  // get specific status
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const getQuery = `
            SELECT * FROM pet_statuses 
            INNER JOIN statuses 
            ON statuses.status_id = pet_statuses.status_id
            WHERE pet_id=($1)
            ORDER BY timestamp DESC;
        `;

    client
      .query(getQuery, [id])
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        console.error(err);
      });
  });

/**
 * add new status to statuses and association in pet_statuses
 * update pet_profile timestamp
 */
router.route("/insert").post((req, res) => {
  // insert new status
  var status = {
    petId: req.body.petId,
    status: req.body.status,
    timestamp: new Date().toISOString(),
  };
  const insertQuery = `
            INSERT INTO statuses (
                status,
                timestamp
                )
            VALUES ($1, $2)
            RETURNING *;
        `;

  client
    .query(insertQuery, [status.status, status.timestamp])
    .then((data) => {
      var newStatus = data.rows[0];
      status.statusId = newStatus.status_id;
      update_pet_profile_timestamp(status);

      insert_pet_status(status);
      res.send(newStatus);
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
