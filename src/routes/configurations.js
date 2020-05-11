const router = require("express").Router();

module.exports = db => {
  // Get all configureations
  router.get("/configurations", (request, response) => {
    db.query("SELECT * FROM configurations WHERE user_id=$1", [
      request.query.userId
    ]).then(data => {
      response.json(data.rows);
    });
  });

  // Create a new configuration
  router.post("/configurations", (request, response) => {
    db.query("INSERT INTO configurations VALUES ($1, $2, $3)", [
      request.body.configuration.name,
      request.body.configuration.projectId,
      request.body.configuration.data
    ])
      .then(resp => {
        setTimeout(() => {
          response.status(400).json({});
        }, 2000);
      })
      .then(err => console.log(err));
  });

  // Update an existing configuration
  router.put("/configurations", (request, response) => {
    db.query(
      "UPDATE configurations SET name=$1, config_data=$2 FROM projects WHERE configurations.id=$3 and projects.user_id=$4",
      [
        request.body.configuration.name,
        request.body.configuration.data,
        request.body.configuration.id,
        request.body.userId
      ]
    ).then(resp => {
      if (resp.rowCount === 0) {
        setTimeout(() => {
          response.status(400).json({});
        }, 2000);
      } else {
        setTimeout(() => {
          response.status(200).json({});
        }, 200);
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
