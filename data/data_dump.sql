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
    ('coco', 1, 'dog', null, null, 'somewhere', 'adoptable', 'placeholder', null, 'active'),
    ('butter', 1, 'cat', null, null, 'somewhere', 'adoptable', 'placeholder', null, 'active'),
    ('nut', 1, 'other', null, null, 'somewhere', 'adoptable', 'placeholder', null, 'active'),
    ('sqash', 1, 'dog', null, null, 'somewhere', 'adoptable', 'placeholder', null, 'active'),
    ('peanut', 2, 'cat', null, null, 'somewhere', 'adoptable', 'placeholder', null, 'active'),
    ('mold', 2, 'dog', null, null, 'somewhere', 'adoptable', 'placeholder', null, 'active');
