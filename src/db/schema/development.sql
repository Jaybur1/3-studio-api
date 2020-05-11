-- TRUNCATE projects, configurations;

INSERT INTO
  projects
  (name, description, user_id, model_link)
VALUES
  (
    'shaver',
    'philips shaver very good',
    'facebook|10158865693899363',
    'https://res.cloudinary.com/aajfinal/raw/upload/v1589055152/models/duck_sqoq6h.glb'
  ),

  ('mouse', 'model of computer mouse', 'facebook|10158865693899363', 'https://res.cloudinary.com/aajfinal/raw/upload/v1589055152/models/duck_sqoq6h.glb'),


  ('tea', 'model of a cup of team', 'facebook|10158865693899363', 'https://res.cloudinary.com/aajfinal/raw/upload/v1589055152/models/duck_sqoq6h.glb'),

  (
    'shaver',
    'philips shaver very good',
    'google-oauth2|117948270148318970184',
    'https://res.cloudinary.com/aajfinal/raw/upload/v1589055152/models/duck_sqoq6h.glb'
  ),

  ('mouse', 'model of computer mouse', 'google-oauth2|117948270148318970184
', 'https://res.cloudinary.com/aajfinal/raw/upload/v1589055152/models/duck_sqoq6h.glb'),

  ('tea', 'model of a cup of team', 'google-oauth2|117948270148318970184
', 'https://res.cloudinary.com/aajfinal/raw/upload/v1589055152/models/duck_sqoq6h.glb'),

  (
    'shaver',
    'philips shaver very good',
    'auth0|5eb6f6ab1cc1ac0c14984e4e',
    'https://res.cloudinary.com/aajfinal/raw/upload/v1589055152/models/duck_sqoq6h.glb'
  ),

  ('mouse', 'model of computer mouse', 'auth0|5eb6f6ab1cc1ac0c14984e4e', 'https://res.cloudinary.com/aajfinal/raw/upload/v1589055152/models/duck_sqoq6h.glb'),

  ('tea', 'model of a cup of team', 'auth0|5eb6f6ab1cc1ac0c14984e4e', 'https://res.cloudinary.com/aajfinal/raw/upload/v1589055152/models/duck_sqoq6h.glb');


INSERT INTO configurations
  (name, project_id, config_data)
VALUES
  (
    'rocket-config-1',
    1,
    'rocket config 1 data'
),

  (
    'mustard-config-1',
    2,
    'mustard config 1 data'
),
  (
    'duck-config-1',
    3,
    'duck config 1 data'
);

INSERT INTO themes
  (user_id, theme)
VALUES
  ('facebook|10158865693899363', 'electric violet'),
  ('google-oauth2|117948270148318970184', 'sea weed'),
  ('auth0|5eb6f6ab1cc1ac0c14984e4e', 'dimigo')









