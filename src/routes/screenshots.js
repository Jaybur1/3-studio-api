const router = require("express").Router();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "aajfinal",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = db => {
  // test cloudinary get
  router.get("/cloud", (request, response) => {
    cloudinary.v2.search
      .expression("folder=screenshots/1")
      .execute()
      .then(result => {
        console.log(result.resources[1].url);
        response.status(200).json({
          url: result.resources
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

  return router;
};
