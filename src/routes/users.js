const axios = require("axios");
const router = require("express").Router();
const request = require("request");
const rp = require("request-promise");

const getToken = () => {
  const tokenOptions = {
    method: "POST",
    url: process.env.AUTH_TOKEN_URL,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {
      grant_type: "client_credentials",
      client_id: process.env.AUTH_TOKEN_CLIENT_ID,
      client_secret: process.env.AUTH_TOKEN_CLIENT_SECRET,
      audience: process.env.AUTH_TOKEN_AUDIENCE
    }
  };

  return rp(tokenOptions)
    .then(tokenResponse => JSON.parse(tokenResponse).access_token)
    .catch(err => console.log(err));
};

module.exports = () => {
  // Edit user details
  router.put("/users", (req, resp) => {
    const objectToChange = {};

    if (req.body.name) {
      objectToChange.name = req.body.name;
    }

    if (req.body.nickname) {
      objectToChange.nickname = req.body.nickname;
    }

    getToken().then(token => {
      axios
        .patch(
          `${process.env.AUTH_USER_URL}${req.body.userId}`,
          objectToChange,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
              "cache-control": "no-cache"
            }
          }
        )
        .then(response => resp.status(200).json({}))
        .catch(error => {
          console.log(error);
          resp.status(400).json({});
        });
    });
  });

  // Update user profile picture
  router.put("/users", (req, resp) => {
    console.log(req, "inside user profile pic update");

    // getToken().then(token => {
    //   axios
    //     .patch(
    //       `${process.env.AUTH_USER_URL}${req.body.userId}`,
    //       objectToChange,
    //       {
    //         headers: {
    //           "content-type": "application/json",
    //           Authorization: `Bearer ${token}`,
    //           "cache-control": "no-cache"
    //         }
    //       }
    //     )
    //     .then(response => resp.status(200).json({}))
    //     .catch(error => {
    //       console.log(error);
    //       resp.status(400).json({});
    //     });
    // });
  });

  // Delete user (deactivate)
  router.delete("/users", (req, resp) => {
    getToken().then(token => {
      axios
        .delete(`${process.env.AUTH_USER_URL}${req.body.userId}`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
            "cache-control": "no-cache"
          }
        })
        .then(response => {
          resp.status(200).json({});
        })
        .catch(error => {
          console.log(error);
          resp.status(400).json({});
        });
    });
  });

  // Reset password (sends email to user)
  router.post("/users", (req, resp) => {
    const options = {
      method: "POST",
      url: process.env.AUTH_CHANGE_PASSWORD_URL,
      headers: { "content-type": "application/json" },
      body: {
        client_id: process.env.AUTH_CHANGE_PASSWORD_CLIENT_ID,
        email: req.body.email,
        connection: "Username-Password-Authentication"
      },
      json: true
    };

    request(options, function(error, response, body) {
      if (error) {
        resp.status(400).json({});
        throw new Error(error);
      } else {
        console.log(body);
        resp.status(200).json({});
      }
    });
  });
  return router;
};
