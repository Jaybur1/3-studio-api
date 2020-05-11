const router = require("express").Router();

module.exports = db => {
  // Get theme of user
  router.get("/themes", (request, response) => {
    db.query("SELECT theme FROM themes WHERE user_id=$1", [
      request.query.userId
    ])
      .then(resp => {
        if (resp.rowCount === 0) {
          response.status(400).json({});
        } else {
          response.status(200).json(resp.rows[0]);
        }
      })
      .catch(err => {
        console.log(err);
        response.status(400).json({});
      });
  });

  // Update theme of user
  router.put("/themes", (request, response) => {
    db.query("UPDATE themes SET theme=$1 WHERE user_id=$2", [
      request.body.theme,
      request.body.userId
    ])
      .then(resp => {
        if (resp.rowCount === 0) {
          response.status(400).json({});
        } else {
          response.status(200).json({});
        }
      })
      .catch(err => {
        console.log(err);
        response.status(400).json({});
      });
  });

  return router;
};
