const router = require("express").Router();

module.exports = db => {
  router.get("/projects", (request, response) => {
    db.query((`SELECT * FROM projects`)).then(data => {
      response.json(data.rows);
    });
  });

  return router;
};
