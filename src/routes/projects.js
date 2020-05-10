const router = require("express").Router();

module.exports = db => {
  //Get all projects
  router.get("/projects", (request, response) => {
    db.query(("SELECT * FROM projects")).then(data => {
      response.json(data.rows);
    });
  });
  
  //Create a new project
  router.post("/projects", (request, response) => {
    db.query(("INSERT INTO projects VALUES ($1, $2, $3, $4)"), [request.body.project.name, request.body.project.description, request.body.userId, request.body.project.modelLink]).then((resp) => {
      setTimeout(() => {
        response.status(400).json({});
      }, 2000);
    }).then(err => console.log(err));
  });

  //Update an existing project
  router.put("/projects", (request, response) => {
    db.query(("UPDATE projects SET name=$1, description=$2 WHERE id=$3 user_id=$4"), [request.body.project.name, request.body.project.description, request.body.project.id, request.body.userId]).then((resp) => {
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
    
  //Delete a project
  router.delete("/projects", (request, response) => {
    db.query(("DELETE FROM projects WHERE id=$1 AND user_id=$2"), [request.body.projectId, request.body.userId]).then((resp) => {
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



