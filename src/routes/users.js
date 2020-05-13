const axios = require("axios");
const router = require("express").Router();
const request = require("request");

module.exports = () => {
  // Edit user details
  router.put("/users", (req, resp) => {
    axios
      .patch(
        `https://dev-1ee5do6a.auth0.com/api/v2/users/${req.body.userId}`,
        {
          name: "ahmed",
          nickname: "warda"
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${MGMT_API_ACCESS_TOKEN}`,
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

  // Delete user (deactivate)
  router.delete("/users", (req, resp) => {
    axios
      .delete(
        `https://dev-1ee5do6a.auth0.com/api/v2/users/${req.body.userId}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${MGMT_API_ACCESS_TOKEN}`,
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

  // Reset password (sends email to user)
  router.post("/users", (req, resp) => {
    console.log("receiveddd");
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

const MGMT_API_ACCESS_TOKEN =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im83V0U0T3VQaDFVaHh6NjF4WG9kUSJ9.eyJpc3MiOiJodHRwczovL2Rldi0xZWU1ZG82YS5hdXRoMC5jb20vIiwic3ViIjoiVHgzUEtnMTdHa204ajkzVHBrRkk3dHFWdnpjajVSclRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LTFlZTVkbzZhLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTg5MjY4NjM2LCJleHAiOjE1ODkzNTUwMzYsImF6cCI6IlR4M1BLZzE3R2ttOGo5M1Rwa0ZJN3RxVnZ6Y2o1UnJUIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.E9gCACQAyFxmLoJGeTQw_ILkAm4Rp2MRGyRhhJbPxA-HKKqMc8i_3ohFTM3m3h9yLgS_w-Z_78o78ma4sltO6n0zfG0L18kWLqhNADcqjdXKpgfUCXlhdeKGlOFMXd7lEu01KGk__laP-3JZAzACXZ-b90eiX99sTvsVMxGjOctxBkxf_jzCXvnF_oe439UMBqavoUwynxIMNOa5G8hjqsIZ_rSSFA0pII0eJZjAAWTtBSEwCiPKsdi_KhBic8Sj7OKR4bdiLlZUM5qwIf-BxN82OHnCFSSwou-QDpa2ZmMalAH7XdvzkcDJyrvURKTMD4TnbfMVtlPiJRcRPuBZcQ";
