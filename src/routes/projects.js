const router = require("express").Router();

module.exports = db => {
  router.get("/projects", (request, response) => {
    db.query(("SELECT * FROM projects")).then(data => {
      response.json(data.rows);
    });
  });

  router.delete("/projects", (request, response) => {
    console.log(request);
    db.query(("DELETE FROM projects WHERE id=$1 AND user_id=$2"), [request.data.projectId, request.data.userID]).then(() => {
      response.status = 200;
    }).catch(response.status = 400);
  });

  return router;
};
