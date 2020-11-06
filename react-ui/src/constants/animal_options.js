
const types = {
    cat : 'cat',
    dog : 'dog',
    other : 'other',
}

const availability_options = {
    available : 'Adoptable',
    unavailable : 'Not Adoptable',
    pending : 'Pending',
}

const breeds = {
    dog : [
        '',
        'Australian Shepherd',
        'Beagle',
        'Bernese Mountain Dog',
        'Boston Terrier',
        'Boxer',
        'Bulldog',
        'Cocker Spaniel',
        'Corgi',
        'Dachshund',
        'Doberman Pinscher',
        'French bulldog',
        'German Shepherd',
        'German Shorthaired pointer',
        'Golden Retriever',
        'Great Dane',
        'Havanese',
        'Labrador Retriever',
        'Miniature Schnauzer',
        'Pomeranian',
        'Poodle',
        'Rottweiler',
        'Shetland Sheepdog',
        'Shih Tzu',
        'Siberian Husky',
        'Yorkshire Terrier',
        'Other/Unknown',
    ],
    cat : [
        '',
        'Abyssinian',
        'American Shorthair',
        'Bengal',
        'Birman',
        'Bombay',
        'British Shorthair',
        'Burmese',
        'Burmilla',
        'Chartreux',
        'Domestic Longhair',
        'Domestic Mediumhair',
        'Domestic Shorthair',
        'Himalayan',
        'Maine Coon',
        'Nebelung',
        'Norwegian Forest',
        'Persian',
        'Ragamuffin',
        'Ragdoll',
        'Russian Blue',
        'Scottish Fold',
        'Siamese',
        'Siberian',
        'Snowshoe',
        'Sphynx',
        'Tonkinese',
        'Turkish Angora',
        'Turkish Van',
        'Other/Unknown',
    ],
    other : ['']
}

const colors = {
    dog : [
        '',
        'Black',
        'Blue',
        'Brown/chocolate',
        'Cream',
        'Fawn',
        'Gold/yellow',
        'Grey',
        'Red',
        'White',
        'Other',
    ],
    cat : [
        '',
        'Bicolor',
        'Black',
        'Black & White',
        'Blue/grey',
        'Brown',
        'Calico/Tricolor',
        'Cinnamon',
        'Colour Point',
        'Cream',
        'Fawn',
        'Red/Ginger',
        'Sable',
        'Tabby',
        'Tortoiseshell',
        'White',
        'Other',
    ],
    other : [
        '',
        'beige',
        'black',
        'blue',
        'green',
        'grey',
        'multi-color',
        'orange',
        'pink',
        'purple',
        'red',
        'white',
        'yellow',
        'other'
    ]
}

const sizes = [
    '',
    'Very thin',
    'Thin',
    'Ideal/Normal',
    'Slightly Overweight',
    'Overweight',
    'Obese',
    'Other',
]

const profile_statuses = {
    active : 'Active',
    inactive : 'Archived'
}

export {
    types, availability_options, breeds, colors, sizes, profile_statuses, 
}