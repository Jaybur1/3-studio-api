const axios = require("axios");
const router = require("express").Router();
const request = require("request");
const rp = require("request-promise");

const getToken = () => {
  const tokenOptions = {
    method: "POST",
    url: "https://dev-1ee5do6a.auth0.com/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {
      grant_type: "client_credentials",
      client_id: "Tx3PKg17Gkm8j93TpkFI7tqVvzcj5RrT",
      client_secret:
        "FRM2SSuvUm9QgzllPtoF31dN_0EwOdIZHRaKfou9xhXobco7FhueerKGzsbC0-9-",
      audience: "https://dev-1ee5do6a.auth0.com/api/v2/"
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
          `https://dev-1ee5do6a.auth0.com/api/v2/users/${req.body.userId}`,
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

  // Delete user (deactivate)
  router.delete("/users", (req, resp) => {
    getToken().then(token => {
      axios
        .delete(
          `https://dev-1ee5do6a.auth0.com/api/v2/users/${req.body.userId}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
              "cache-control": "no-cache"
            }
          }
        )
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
      url: "https://dev-1ee5do6a.auth0.com/dbconnections/change_password",
      headers: { "content-type": "application/json" },
      body: {
        client_id: "IysHD3AMe37ZsxVf0cW9TfVDMDjJ0VHv",
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
