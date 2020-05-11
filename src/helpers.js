const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "aajfinal",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const getScreenshotsForProject = projectId =>
  cloudinary.v2.search
    .expression(`folder=screenshots/${projectId}`)
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

      return screenshots;
    })
    .catch(err => console.log(err));

module.exports = { getScreenshotsForProject };
