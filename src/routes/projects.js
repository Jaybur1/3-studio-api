const router = require("express").Router();

module.exports = db => {
  router.get("/projects", (request, response) => {
    db.query(("SELECT * FROM projects")).then(data => {
      response.json(data.rows);
    });
  });

  router.delete("/projects", (request, response) => {
    console.log(request.body);
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
