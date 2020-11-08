INSERT INTO users (email, username, is_admin, is_creator, profile_pic_id)
VALUES
    ('email@email.com', 'email', 'true', 'true', null),
    ('jenny@email.com', 'jh', 'true', 'true', null),
    ('tim@email.com', 'tw', 'true', 'true', null),
    ('yvonne@email.com', 'ym', 'true', 'true', null),
    ('something@email.com', 'ya i guess', 'false', 'true', null),
    ('test@test.com', 'test', 'true', 'true', null);

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
        weight,
        sex,
        story
    ) VALUES (
        'bilbobaggins', 
        1, 
        'cat', 
        'domestic shorthair', 
        36, 
        'Topeka, KS', 
        'adoptable', 
        '2020-06-20T18:30:00.000Z', 
        null, 
        'active',
        'white, gray',
        'medium',
        10,
        'Male',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus quam id leo in vitae turpis massa. Sapien nec sagittis aliquam malesuada bibendum. Ultricies integer quis auctor elit sed vulputate mi sit. In ante metus dictum at tempor commodo ullamcorper a. In nibh mauris cursus mattis molestie. Egestas dui id ornare arcu odio ut sem nulla. Fermentum leo vel orci porta non pulvinar neque laoreet. Bibendum at varius vel pharetra vel. Integer enim neque volutpat ac tincidunt vitae semper quis. Auctor elit sed vulputate mi sit amet mauris. In egestas erat imperdiet sed euismod nisi porta lorem. Nisl pretium fusce id velit ut tortor pretium viverra. In nibh mauris cursus mattis molestie a iaculis at. Fermentum iaculis eu non diam phasellus vestibulum lorem sed. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Dui accumsan sit amet nulla facilisi morbi tempus. Aliquet nibh praesent tristique magna. Vulputate sapien nec sagittis aliquam. Ullamcorper morbi tincidunt ornare massa. Volutpat ac tincidunt vitae semper quis lectus nulla. Id diam vel quam elementum pulvinar etiam. Turpis egestas sed tempus urna et. Vulputate mi sit amet mauris commodo quis imperdiet massa. Amet massa vitae tortor condimentum. Suspendisse in est ante in nibh mauris cursus mattis molestie. Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Quam vulputate dignissim suspendisse in est ante in nibh.'
    );

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

INSERT INTO petmarks (user_id, pet_id)
VALUES
    (1, 5),
    (1, 6),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1);

INSERT INTO dispositions (disposition)
VALUES
    ('Spayed/Neutered'),
    ('Good w/ dogs'),
    ('Good w/ cats'),
    ('House-trained'),
    ('Good w/ children'),
    ('People-oriented'),
    ('Friendly'),
    ('Shots up to date'),
    ('Needs experienced adopter'),
    ('Has special needs');

INSERT INTO pet_dispositions (pet_id, disposition)
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (1, 6),
    (1, 7),
    (2, 1),
    (2, 8),
    (2, 9),
    (2, 10),
    (3, 1),
    (3, 4),
    (3, 5),
    (4, 1),
    (4, 3),
    (5, 1),
    (5, 2),
    (5, 3),
    (5, 4),
    (5, 5),
    (5, 6);