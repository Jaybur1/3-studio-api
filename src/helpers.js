const cloudinary = require("cloudinary");
const axios = require("axios");

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

const createProjectFolder = projectId =>
  axios.post(
    `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/aajfinal/folders/screenshots/${projectId}`
  );

const createDefaultConfigurationDataString = () =>
  JSON.stringify({
    bgEnvironment: false,
    bgSolid: true,
    bgColor: "525252",
    mapEnvironment: true,
    currentEnvironmentOption: {
      name: "studio-1",
      hdrPath:
        "https://res.cloudinary.com/aajfinal/raw/upload/v1589352709/environments/studio-1_ugueaj.hdr",
      imgPath:
        "https://res.cloudinary.com/aajfinal/image/upload/v1589352866/environments/studio-1_sl7xag.jpg"
    },
    ambientLight: true,
    directionalLight: true,
    hemisphereLight: true,
    ambientLightIntensity: 0.3,
    directionalLightIntensity: 0.8 * Math.PI,
    hemisphereLightIntensity: 1,
    ambientLightColor: "ffffff",
    directionalLightColor: "ffffff",
    hemisphereLightColor: "ffffff",
    materials: []
  });

module.exports = {
  getScreenshotsForProject,
  deleteProjectFolder,
  createProjectFolder,
  createDefaultConfigurationDataString
};
