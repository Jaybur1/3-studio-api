const router = require("express").Router();

module.exports = db => {
  //Get all configureations
  router.get("/configurations", (request, response) => {
    db.query(("SELECT * FROM configurations")).then(data => {
      response.json(data.rows);
    });
  });

  //Create a new configuration
  router.post("/configurations", (request, response) => {
    db.query(("INSERT INTO configurations VALUES ($1, $2, $3)"), [request.body.configuration.name, request.body.configuration.projectId, request.body.configuration.configurationData]).then((resp) => {
      setTimeout(() => {
        response.status(400).json({});
      }, 2000);
    }).then(err => console.log(err));
  });

  //Update an existing configuration
  router.put("/configurations", (request, response) => {
    db.query(("UPDATE configurations SET name=$1, config_data=$2 WHERE project_id=$3"), [request.body.configuration.name, request.body.configurationData, request.body.configuration.projectId]).then((resp) => {
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

  //Delete a configuration
  router.delete("/configurations", (request, response) => {
    db.query(("DELETE FROM configurations WHERE id=$1 AND project_id=$2"), [request.body.configurations.id, request.body.configurations.projectId]).then((resp) => {
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


UPDATE configurations SET name='new_rocket_config', config_data='new_rocket_config_data' WHERE project_id=1;
