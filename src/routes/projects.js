const router = require("express").Router();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "aajfinal",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = db => {
  // Get all projects and their screenshots
  router.get("/projects", (request, response) => {
    db.query("SELECT * FROM projects WHERE user_id=$1", [
      "google-oauth2|117948270148318970184"
    ])
      .then(data => {
        data.rows.forEach(element => {
          cloudinary.v2.search
            .expression(`folder=screenshots/${element.id}`)
            .execute()
            .then(result => {
              const screenshots = [];
              // Extract label and path of screenshot and push to new array
              result.resources.forEach(resource => {
                screenshots.push({
                  label: resource.filename,
                  path: resource.url
                });

                element.screenshots = screenshots;
              });
              response.status(200).json({ projects: data.rows });
            });
        });
      })

      .catch(err => console.log(err));
  });

  // Create a new project
  router.post("/projects", (request, response) => {
    const { name, description, userId, modelLink } = request.body;
    console.log(request.body);
    db.query(
      "INSERT INTO projects (name, description, user_id, model_link) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, userId, modelLink]
    )
      .then(resp => {
        // response.send(resp.rows);
        const {
          user_id,
          updated_at,
          model_link,
          default_thumbnail,
          created_at,
          id,
          name,
          description
        } = resp.rows[0];

        const projectData = {
          id,
          name,
          description,
          userId: user_id,
          updatedAt: updated_at,
          modelLink: model_link,
          screenshots: [{ path: default_thumbnail, label: "default_pic" }],
          createdAt: created_at
        };
        response.send(projectData);
      })
      .then(err => console.log(err));
  });

  // Update an existing project
  router.put("/projects", (request, response) => {
    db.query(
      "UPDATE projects SET name=$1, description=$2 WHERE id=$3 AND user_id=$4",
      [
        request.body.project.name,
        request.body.project.description,
        request.body.project.id,
        request.body.userId
      ]
    ).then(resp => {
      if (resp.rowCount === 0) {
        setTimeout(() => {
          response.status(400).json({});
        }, 2000);
      } else {
        setTimeout(() => {
          response.status(200).json({});
        }, 200);
      }
    });
  });

  // Delete a project
  router.delete("/projects", (request, response) => {
    db.query("DELETE FROM projects WHERE id=$1 AND user_id=$2", [
      request.body.projectId,
      request.body.userId
    ]).then(resp => {
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
