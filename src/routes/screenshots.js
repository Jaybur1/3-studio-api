const router = require("express").Router();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "aajfinal",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = () => {
  router.get("/screenshots", (request, response) => {
    cloudinary.v2.search
      .expression(`folder=screenshots/${request.query.projectId}`)
      .execute()
      .then(result => {
        const screenshots = [];

        // Extract label and path of screenshot and push to new array
        result.resources.forEach(resource => {
          screenshots.push({
            label: resource.filename,
            path: resource.url
          });
        });

        // Send screenshots
        response.status(200).json({
          screenshots
        });
      })
      .catch(err => {
        console.log(err);

        // Send error status
        response.status(400).json({});
      });
  });

  return router;
};
