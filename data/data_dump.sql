INSERT INTO users (email, username, is_admin, is_creator, profile_pic_id)
VALUES
    ('email@email.com', 'email', 'true', 'true', null),
    ('jenny@email.com', 'jh', 'true', 'true', null),
    ('tim@email.com', 'tw', 'true', 'true', null),
    ('yvonne@email.com', 'ym', 'true', 'true', null),
    ('something@email.com', 'ya i guess', 'false', 'true', null);

INSERT INTO pet_profiles
    (
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
VALUES
    ('coco', 1, 'dog', null, null, 'somewhere', 'adoptable', '2020-06-20T18:30:00.000Z', null, 'active'),
    ('butter', 1, 'cat', null, null, 'somewhere', 'adoptable', '2020-06-20T18:30:00.000Z', null, 'active'),
    ('nut', 1, 'other', null, null, 'somewhere', 'adoptable', '2020-06-20T18:30:00.000Z', null, 'active'),
    ('sqash', 1, 'dog', null, null, 'somewhere', 'adoptable', '2020-06-20T18:30:00.000Z', null, 'active'),
    ('peanut', 2, 'cat', null, null, 'somewhere', 'adoptable', '2020-06-20T18:30:00.000Z', null, 'active'),
    ('mold', 2, 'dog', null, null, 'somewhere', 'adoptable', '2020-06-20T18:30:00.000Z', null, 'active');

INSERT INTO statuses ( status, timestamp )
VALUES
    ('status here', '2020-06-20T18:30:00.000Z'),
    ('status there', '2020-06-20T18:30:00.000Z'),
    ('status where', '2020-06-20T18:30:00.000Z'),
    ('status every where', '2020-06-20T18:30:00.000Z'),
    ('status no where', '2020-06-20T18:30:00.000Z'),
    ('another here', '2020-06-20T18:30:00.000Z'),
    ('another there', '2020-06-20T18:30:00.000Z'),
    ('another where', '2020-06-20T18:30:00.000Z'),
    ('another every where', '2020-06-20T18:30:00.000Z'),
    ('another no where', '2020-06-20T18:30:00.000Z');

INSERT INTO pet_statuses (pet_id, status_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 4),
    (2, 5),
    (3, 6),
    (4, 7),
    (4, 8),
    (4, 9),
    (5, 10);