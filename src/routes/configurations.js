const router = require("express").Router();

const { createDefaultConfigurationDataString } = require("../helpers");

module.exports = db => {
  // Get all configurations
  router.get("/configurations", (request, response) => {
    db.query("SELECT * FROM configurations WHERE project_id=$1", [
      request.query.projectId
    ])
      .then(data => {
        response.json(data.rows);
      })
      .catch(err => console.log(err));
  });

  // Create a new configuration
  router.post("/configurations", (request, response) => {
    const defaultConfig = createDefaultConfigurationDataString();

    db.query(
      "INSERT INTO configurations (name, project_id, config_data) VALUES ($1, $2, $3) RETURNING *",
      [
        request.body.configuration.name,
        request.body.configuration.projectId,
        request.body.configuration.config_data || defaultConfig
      ]
    )
      .then(resp => {
        const { id } = resp.rows[0];

        response.status(200).json({ id });
      })
      .catch(err => {
        console.log("hey error");
        console.log(err);
      });
  });

  // Update an existing configuration
  router.put("/configurations", (request, response) => {
    db.query(
      "UPDATE configurations SET config_data=$1 FROM projects WHERE configurations.id=$2 and projects.user_id=$3",
      [
        JSON.stringify(request.body.configuration.data),
        request.body.configuration.id,
        request.body.userId
      ]
    ).then(resp => {
      if (resp.rowCount === 0) {
        response.status(400).json({});
      } else {
        console.log("reached safely");
        response.status(200).json({});
      }
    });
  });

  // Delete a configuration
  router.delete("/configurations", (request, response) => {
    db.query(
      "DELETE FROM configurations USING projects WHERE configurations.id=$1 AND projects.user_id=$2",
      [request.body.configurationId, request.body.userId]
    ).then(resp => {
      if (resp.rowCount === 0) {
        // ? Simulate delay
        setTimeout(() => {
          response.status(400).json({});
        }, 2000);
      } else {
        // ? Simulate delay
        setTimeout(() => {
          response.status(200).json({});
        }, 2000);
      }
    });
  });

  return router;
};
