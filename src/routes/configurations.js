const router = require("express").Router();

module.exports = db => {
  router.get("/configurations", (request, response) => {
    db.query(("SELECT * FROM configurations")).then(data => {
      response.json(data.rows);
    });
  });

  return router;
};