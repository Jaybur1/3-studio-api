DROP TABLE IF EXISTS projects
CASCADE;

DROP TABLE IF EXISTS configurations
CASCADE;

DROP TABLE IF EXISTS themes
CASCADE;

CREATE TABLE projects
(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  user_id TEXT NOT NULL,
  default_thumbnail TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/cloud3studio/image/upload/v1591140913/testLogo3_zz0pnu.png',
  model_link TEXT NOT NULL,
  counter INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP
  WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
  WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

  CREATE TABLE configurations
  (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    config_data TEXT,
    created_at TIMESTAMP
    WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
    WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

    CREATE TABLE themes
    (
      id SERIAL PRIMARY KEY NOT NULL,
      user_id VARCHAR(255) NOT NULL,
      theme VARCHAR(255) NOT NULL DEFAULT 'cherry'
    );