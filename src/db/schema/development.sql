-- TRUNCATE projects, configurations;

INSERT INTO
  projects
  (name, description, user_id, model_link)
VALUES
  (
    'rocket',
    'a model of a rocket ship and a planet',
    'google-oauth2|117948270148318970184',
    'https://res.cloudinary.com/aajfinal/raw/upload/v1589051908/models/rocket_kcy5w0.glb'
  ),
  ('mustard', 'mustard bottle!', 'auth0|5eb6f6ab1cc1ac0c14984e4e', 'https://res.cloudinary.com/aajfinal/raw/upload/v1589051277/models/mustard_mhxcwm.glb'),

  ('duck', 'duck model', 'auth0|5eb6f6ab1cc1ac0c14984e4e', 'https://res.cloudinary.com/aajfinal/raw/upload/v1589055152/models/duck_sqoq6h.glb');


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




