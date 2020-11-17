INSERT INTO
users(first_name, last_name, email, password, type, avatar_url)
VALUES
    ('Mario', 'Bros', 'mario@nintendo.com', '$2b$10$8XpRtCvUSRqsyI3NsvlZZ.1aw21koHFGeGv3tvHru5xNB.hNLn4lK', 'admin', 'client/public/person-male.png'),
    ('Luigi', 'Bros', 'luigi@nintendo.com', '$2b$10$8XpRtCvUSRqsyI3NsvlZZ.1aw21koHFGeGv3tvHru5xNB.hNLn4lK', 'client', 'client/public/person-male.png'),
    (
        'Princess',
        'Peach',
        'peach@nintendo.com',
        '$2b$10$8XpRtCvUSRqsyI3NsvlZZ.1aw21koHFGeGv3tvHru5xNB.hNLn4lK',
        'client', 
        'client/public/person-female.png'
    ),
    (
        'Princess',
        'Daisy',
        'daisy@nintendo.com',
        '$2b$10$8XpRtCvUSRqsyI3NsvlZZ.1aw21koHFGeGv3tvHru5xNB.hNLn4lK',
        'client', 
        'client/public/person-female.png'
    ),
    ('Donkey', 'Kong', 'donkey@nintendo.com', '$2b$10$RDXaiWph46XHKKhtiAOpseQJxHqjTkBaHszycWM6pvW0A5SEPP2ke', 'client', 'client/public/person-male.png'),
    ('Bia', 'Bia', 'bia@g.com', '$2b$10$8XpRtCvUSRqsyI3NsvlZZ.1aw21koHFGeGv3tvHru5xNB.hNLn4lK', 'admin', 'client/public/person-female.png');