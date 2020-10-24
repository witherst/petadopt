DROP TABLE IF EXISTS 
    users, 
    pet_profiles, 
    photos, 
    pet_pics, 
    petmarks, 
    pet_dispositions, 
    statuses,
    pet_statuses;

/* one to one: user has one pic for account*/
CREATE TABLE public.users
(
    internal_user_id SERIAL UNIQUE NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    username VARCHAR(32) UNIQUE NOT NULL,
    is_admin BOOLEAN NOT NULL,
    is_creator BOOLEAN NOT NULL,
    profile_pic_id INT,
    PRIMARY KEY (email)
);

/* one to many: user has one or many pet profiles */
CREATE TABLE public.pet_profiles
(
    internal_pet_id SERIAL UNIQUE NOT NULL,
    external_pet_id VARCHAR(32) UNIQUE NOT NULL,
    creator_id INT NOT NULL,
    animal_type VARCHAR(32) NOT NULL,
    breed VARCHAR(32),
    age_in_months INT,
    location VARCHAR(64),
    availablity VARCHAR(32) NOT NULL,
    last_updated_timestamp VARCHAR(64) NOT NULL,
    profile_pic_id INT,
    profile_status VARCHAR(32) NOT NULL,
    PRIMARY KEY (creator_id),
    CONSTRAINT fk_creator_id FOREIGN KEY (creator_id) REFERENCES public.users (internal_user_id)
);

CREATE UNIQUE INDEX external_pet_id_index on public.pet_profiles (external_pet_id);

/* holds the endpoint location for every photo used in app */
CREATE TABLE public.photos
(
    internal_pic_id SERIAL UNIQUE NOT NULL,
    endpoint VARCHAR(64),
    PRIMARY KEY (internal_pic_id)
);

ALTER TABLE public.users
ADD CONSTRAINT fk_profile_pic_id FOREIGN KEY (profile_pic_id) REFERENCES public.photos (internal_pic_id);

ALTER TABLE public.pet_profiles
ADD CONSTRAINT fk_profile_pic_id FOREIGN KEY (profile_pic_id) REFERENCES public.photos (internal_pic_id);

/* one-to-many: one pet profile with none, one, or many pictures*/
CREATE TABLE public.pet_pics 
(
    pet_id INT NOT NULL,
    pic_id INT NOT NULL,
    PRIMARY KEY (pet_id),
    CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles (internal_pet_id),
    CONSTRAINT fk_pic_id FOREIGN KEY (pic_id) REFERENCES public.photos (internal_pic_id)
);

/* one to many: one user follows none, one, or many pet profiles followed */
CREATE TABLE public.petmarks
(
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    PRIMARY KEY (user_id),
    
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users (internal_user_id),
    CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles (internal_pet_id)
);

/* one-to-many: one pet profile can have many dispositions */
CREATE TABLE public.pet_dispositions (
    pet_id INT NOT NULL,
    disposition VARCHAR(255) NOT NULL,
    PRIMARY KEY (pet_id),
    CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles (internal_pet_id)
);

/* holds status info */
CREATE table public.statuses (
    status_id SERIAL NOT NULL,
    timestamp VARCHAR(64) NOT NULL,
    status VARCHAR(1024) NOT NULL,
    PRIMARY KEY (status_id)
);

/* one-to-many: one pet profile can have many statuses */
CREATE TABLE public.pet_statuses (
    pet_id INT NOT NULL,
    status_id INT NOT NULL,
    PRIMARY KEY (pet_id),
    CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles (internal_pet_id),
    CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES public.statuses (status_id)
);
