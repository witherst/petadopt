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

const getFilterQuery = (req) => {
  const context = {
    disposition: req.query.disposition,
    type: req.query.type,
    breed: req.query.breed,
    color: req.query.color,
  };

  var getQuery = `SELECT * FROM pet_profiles`;

  var andConcat = false;

  if (context.disposition) {
    getQuery += `
    INNER JOIN pet_dispositions
    ON pet_dispositions.pet_id=pet_profiles.internal_pet_id
    INNER JOIN dispositions
    ON dispositions.id=pet_dispositions.disposition
    WHERE dispositions.disposition=('${context.disposition}')
    `;
    andConcat = true;
  } else {
    getQuery += ` WHERE `;
  }

  if (context.type) {
    if (andConcat) {
      getQuery += ` AND `;
    }
    getQuery += `animal_type=('${context.type}')`;
    andConcat = true;
  }
  if (context.breed) {
    if (andConcat) {
      getQuery += ` AND `;
    }
    getQuery += `breed=('${context.breed}')`;
    andConcat = true;
  }
  if (context.color) {
    if (andConcat) {
      getQuery += ` AND `;
    }
    andConcat = true;
    getQuery += `color=('${context.color}')`;
  }

  getQuery += ` ORDER BY pet_profiles.last_updated_timestamp DESC;`;
  return getQuery;
};

router
  .route("/")
  // get all pet profiles & data from pet_profiles table
  .get((req, res) => {
    res.set("Content-Type", "application/json");

    const getQuery = `
            SELECT * 
            FROM pet_profiles
            LEFT JOIN photos
            ON photos.internal_pic_id=pet_profiles.profile_pic_id
            ORDER BY last_updated_timestamp DESC;
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

router.route("/featured").get((req, res) => {
  const getQuery = `
            SELECT * 
            FROM pet_profiles
            LEFT JOIN photos
            ON photos.internal_pic_id=pet_profiles.profile_pic_id
            ORDER BY last_updated_timestamp DESC
            LIMIT ($1);
        `;
  client
    .query(getQuery, [req.query.num])
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.route("/filter").get((req, res) => {
  var getQuery = getFilterQuery(req);
  client.query(getQuery).then((data) => {
    res.send(data.rows);
  });
});

router
  .route("/user/:id")
  // get all pet profiles for a specified user
  .get((req, res) => {
    const creator_id = parseInt(req.params.id);
    const getQuery = `
            SELECT * FROM pet_profiles 
            LEFT JOIN photos
            ON photos.internal_pic_id=pet_profiles.profile_pic_id
            WHERE creator_id=($1)
            ORDER BY last_updated_timestamp;
        `;

    client
      .query(getQuery, [creator_id])
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        console.error(err);
      });
  });

router
  .route("/:id")
  // get specific pet profile
  .get((req, res) => {
    const internal_pet_id = parseInt(req.params.id);

    const getQuery = `
            SELECT * FROM pet_profiles 
            LEFT JOIN photos
            ON photos.internal_pic_id=pet_profiles.profile_pic_id
            WHERE internal_pet_id=($1)
        `;

    client
      .query(getQuery, [internal_pet_id])
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        console.error(err);
      });
  });

// query for existing matching petname for user
// router.route('/verify')
router.route("/verify/:user_id/:pet_name").get((req, res) => {
  const context = {
    userId: req.params.user_id,
    petName: req.params.pet_name,
  };
  const getQuery = `	
            SELECT * FROM pet_profiles WHERE creator_id=($1) AND external_pet_id=($2);	
        `;
  client
    .query(getQuery, [context.userId, context.petName])
    .then((data) => {
      if (data.rows[0]) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

router.route("/petmark/:userId").get((req, res) => {
  const userId = req.params.userId;
  const getQuery = `
            SELECT * FROM petmarks
            INNER JOIN pet_profiles
            ON pet_profiles.internal_pet_id = petmarks.pet_id
            WHERE user_id=($1)
            ORDER BY external_pet_id;
        `;
  client
    .query(getQuery, [userId])
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

// insert pet profile in table and return the data
router.route("/insert").post((req, res) => {
  const timestamp = new Date().toISOString();
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
    lastUpdatedTimestamp: timestamp,
    creationTimestamp: timestamp,
    profileStatus: "Active",
  };
  pet.age = req.body.age ? parseInt(req.body.age) : null;
  pet.weight = req.body.weight ? parseInt(req.body.weight) : null;
  pet.profilePicId = isNaN(req.body.profilePicId)
    ? null
    : parseInt(req.body.profilePicId);

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
                creation_timestamp,
                profile_pic_id,
                profile_status,
                color,
                size,
                sex,
                weight,
                story
            ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *;
    `;

  client
    .query(insertQuery, [
      pet.externalPetId,
      pet.creatorId,
      pet.animalType,
      pet.breed,
      pet.age,
      pet.location,
      pet.availability,
      pet.lastUpdatedTimestamp,
      pet.creationTimestamp,
      pet.profilePicId,
      pet.profileStatus,
      pet.color,
      pet.size,
      pet.sex,
      pet.weight,
      pet.story,
    ])
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.route("/delete").delete((req, res) => {
  const petId = req.body.petId;
  const deleteQuery = `
    DELETE FROM pet_profiles WHERE internal_pet_id=($1)
  `;
  client
    .query(deleteQuery, [petId])
    .then((data) => {
      res.send(true);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.route("/update/availability").put((req, res) => {
  const context = {
    petId: req.body.petId,
    availability: req.body.availability,
  };
  const putQuery = `
    UPDATE pet_profiles
    SET availability=($1)
    WHERE internal_pet_id=($2)
    RETURNING *;
  `;

  client
    .query(putQuery, [context.availability, context.petId])
    .then((data) => {
      res.send(data.rows[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
