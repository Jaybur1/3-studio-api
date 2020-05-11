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

const deleteProjectFolder = projectId =>
  cloudinary.v2.api
    .delete_resources_by_prefix(`screenshots/${projectId}`)
    .then(() => cloudinary.v2.api.delete_folder(`screenshots/${projectId}`));

module.exports = { getScreenshotsForProject, deleteProjectFolder };
