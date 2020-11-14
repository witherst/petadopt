DROP TABLE IF EXISTS 
    users, 
    pet_profiles, 
    photos, 
    pet_pics, 
    petmarks, 
    dispositions,
    pet_dispositions, 
    statuses,
    pet_statuses;

/* one to one: user has one pic for account*/
CREATE TABLE public.users
(
    internal_user_id SERIAL NOT NULL,
    email VARCHAR(64) NOT NULL,
    username VARCHAR(32) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    is_creator BOOLEAN NOT NULL,
    profile_pic_id INT,
    UNIQUE(email),
    UNIQUE(username),
    PRIMARY KEY (internal_user_id)
);

/* one to many: user has one or many pet profiles */
CREATE TABLE public.pet_profiles
(
    internal_pet_id SERIAL NOT NULL,
    external_pet_id VARCHAR(32) NOT NULL,
    creator_id INT NOT NULL,
    animal_type VARCHAR(32) NOT NULL,
    breed VARCHAR(32),
    age_in_months INT,
    color VARCHAR(32),
    size VARCHAR(32),
    weight INT,
    sex VARCHAR(8),
    story VARCHAR(4096),
    location VARCHAR(64),
    availability VARCHAR(32) NOT NULL,
    creation_timestamp VARCHAR(64) NOT NULL,
    last_updated_timestamp VARCHAR(64) NOT NULL,
    profile_pic_id INT,
    profile_status VARCHAR(32) NOT NULL,
    PRIMARY KEY (internal_pet_id),
    UNIQUE(creator_id, external_pet_id),
    CONSTRAINT fk_creator_id FOREIGN KEY (creator_id) REFERENCES public.users (internal_user_id) ON DELETE CASCADE
);

/* holds the endpoint location for every photo used in app */
CREATE TABLE public.photos
(
    internal_pic_id SERIAL NOT NULL,
    endpoint VARCHAR(64),
    PRIMARY KEY (internal_pic_id)
);

ALTER TABLE public.users
ADD CONSTRAINT fk_profile_pic_id FOREIGN KEY (profile_pic_id) REFERENCES public.photos (internal_pic_id) ON DELETE CASCADE;

ALTER TABLE public.pet_profiles
ADD CONSTRAINT fk_profile_pic_id FOREIGN KEY (profile_pic_id) REFERENCES public.photos (internal_pic_id) ON DELETE CASCADE;

/* one-to-many: one pet profile with none, one, or many pictures*/
CREATE TABLE public.pet_pics 
(
    pet_id INT NOT NULL,
    pic_id INT NOT NULL,
    PRIMARY KEY (pet_id, pic_id),
    CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles (internal_pet_id) ON DELETE CASCADE,
    CONSTRAINT fk_pic_id FOREIGN KEY (pic_id) REFERENCES public.photos (internal_pic_id) ON DELETE CASCADE
);

/* one to many: one user follows none, one, or many pet profiles followed */
CREATE TABLE public.petmarks
(
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    PRIMARY KEY (user_id, pet_id),
    
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users (internal_user_id) ON DELETE CASCADE,
    CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles (internal_pet_id) ON DELETE CASCADE
);

/* holds dispositions */
CREATE TABLE public.dispositions (
    id SERIAL NOT NULL,
    disposition VARCHAR(64) NOT NULL,
    count INT,
    PRIMARY KEY (id)
);

/* one-to-many: one pet profile can have many dispositions */
CREATE TABLE public.pet_dispositions (
    pet_id INT NOT NULL,
    disposition INT NOT NULL,
    PRIMARY KEY (pet_id, disposition),
    CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles (internal_pet_id) ON DELETE CASCADE,
    CONSTRAINT fk_disposition FOREIGN KEY (disposition) REFERENCES public.dispositions (id) ON DELETE CASCADE
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
    PRIMARY KEY (pet_id, status_id),
    CONSTRAINT fk_pet_id FOREIGN KEY (pet_id) REFERENCES public.pet_profiles (internal_pet_id) ON DELETE CASCADE,
    CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES public.statuses (status_id) ON DELETE CASCADE
);
