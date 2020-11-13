INSERT INTO
users(first_name, last_name, email, password, type, avatar_url)
VALUES
    ('Mario', 'Bros', 'mario@nintendo.com', 'test', 'admin', 'client/public/person-male.png'),
    ('Luigi', 'Bros', 'luigi@nintendo.com', 'test', 'client', 'client/public/person-male.png'),
    (
        'Princess',
        'Peach',
        'peach@nintendo.com',
        'test',
        'client', 
        'client/public/person-female.png'
    ),
    (
        'Princess',
        'Daisy',
        'daisy@nintendo.com',
        'test',
        'client', 
        'client/public/person-female.png'
    ),
    ('Donkey', 'Kong', 'donkey@nintendo.com', 'test', 'client', 'client/public/person-male.png');