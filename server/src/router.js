const config = require("./config.json");

const db = require("./database");
const emailer = require("./email");
const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const verifier = require("cognito-express");
const cognito = new aws.CognitoIdentityServiceProvider({
  region: config.aws_region,
});

const accessVerifier = new verifier({
  region: "us-east-2",
  cognitoUserPoolId: config.cognito.userPoolId,
  tokenUse: "access",
  tokenExpiration: 3600000,
});

const idVerifier = new verifier({
  region: "us-east-2",
  cognitoUserPoolId: config.cognito.userPoolId,
  tokenUse: "id",
  tokenExpiration: 3600000,
});

const verifyClient = async (req, res, callback) => {
  accessVerifier.validate(req.cookies.authCookie.accessToken, (err, accessData) => {
    if (err) {
      res.status(401).send(err);
    } else {
      idVerifier.validate(req.cookies.authCookie.idToken, (err2, idData) => {
        if (err2) {
          res.status(401).send(err2);
        } else {
          callback(accessData, idData);
        }
      });
    }
  });
};

// req json needs email, password, street_name, company_name, suite_number, city, state, zipcode
router.post("/signup", (req, res) => {
  var params = {
    ClientId: config.cognito.clientId,
    Username: req.body.email,
    Password: req.body.password,
    UserAttributes: [
      {
        Name: "custom:street_name",
        Value: req.body.street_name,
      },
      {
        Name: "custom:company_name",
        Value: req.body.company_name,
      },
      {
        Name: "custom:suite_number",
        Value: req.body.suite_number,
      },
      {
        Name: "custom:city",
        Value: req.body.city,
      },
      {
        Name: "custom:state",
        Value: req.body.state,
      },
      {
        Name: "custom:zipcode",
        Value: req.body.zipcode,
      },
      {
        Name: "custom:is_activated",
        Value: "False",
      },
    ],
  };

  cognito.signUp(params, (err, data) => {
    if (err) {
      res.json(err);
    }
  });
});

// req json needs email, sub
// req cookie needs admin group
router.post("/activate", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    if (accessData["cognito:groups"][0] != "Admin") {
      res.json({
        error: {
          message: "Improper permissions: not admin",
        },
      });
      return;
    }

    var params = {
      UserPoolId: config.cognito.userPoolId,
      Username: req.body.sub,
      UserAttributes: [
        {
          Name: "custom:is_activated",
          Value: "True",
        },
      ],
    };

    cognito.adminUpdateUserAttributes(params, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        var params = {
          GroupName: "PropertyManager",
          UserPoolId: config.cognito.userPoolId,
          Username: req.body.sub,
        };

        cognito.adminAddUserToGroup(params, (err2, data2) => {
          if (err2) {
            res.json(err2);
          } else {
            db.insertUserId(req.body.sub);
            emailer.sentEmail(req.body.email, `The PropTech Web App Account associated with ${req.body.email} email has been approved`);
            res.json(data);
          }
        });
      }
    });
  });
});

// req json needs sub
// req cookie needs admin group
router.delete("/reject", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    if (accessData["cognito:groups"][0] != "Admin") {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }

    var params = {
      UserPoolId: config.cognito.userPoolId,
      Username: req.body.sub,
    };

    cognito.adminDeleteUser(params, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    });
  });
});

// req json needs accessToken
router.post("/auth", (req, res) => {
  accessVerifier.validate(req.body.accessToken, (err, accessData) => {
    if (err) {
      res.status(401).send(err);
    } else {
      idVerifier.validate(req.body.idToken, (err2, idData) => {
        if (err2) {
          res.status(401).send(err2);
        } else {
          res.cookie("authCookie", { accessToken: req.body.accessToken, idToken: req.body.idToken }, { httpOnly: true });
          res.json({ accessData, idData });
        }
      });
    }
  });
});

// req json needs sub if admin group
// req cookie needs admin or propertyManager group
router.get("/property/:sub?", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.params.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }

    db.selectAllProperties(sub, (results) => {
      res.json(JSON.parse(JSON.stringify(results)));
    });
  });
});

// req json needs property info (and sub if admin group)
// req cookie needs admin or propertyManager group
router.patch("/property", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.body.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }

    db.updateProperty(sub, req.body.property_info, (results) => {
      res.json(results);
    });
  });
});

// req json needs property info (and sub if admin group)
// req cookie needs admin or propertyManager group
router.post("/property", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.body.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }

    db.insertProperty(sub, req.body.property_info, (results) => {
      res.json(results);
    });
  });
});

// req json needs property_id (and sub if admin group)
// req cookie needs admin or propertyManager group
router.delete("/property", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.body.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }

    db.deleteProperty(sub, req.body.property_id, (results) => {
      res.json(results);
    });
  });
});

//request to get tenant list
router.get("/tenant/:property_id?", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.body.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }

    db.selectAllTenants(req.params.property_id, (results) => {
      res.json(JSON.parse(JSON.stringify(results)));
    });
  });
});
// request to delete tenant
router.delete("/tenant", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.body.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }

    db.deleteTenant(req.body.property_id, req.body.tenant_id, (result) => {
      res.json(result);
    });
  });
});

//request to update tenant info
router.patch("/tenant", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.body.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }

    db.updateTenant(req.body.tenant_id, req.body.tenant_info, (result) => {
      res.json(result);
    });
  });
});

//add new tenant to list
router.post("/tenant", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.body.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }
    db.insertTenant(req.body.property_id, req.body.tenant_info, (result) => {
      res.json(result);
    });
  });
});

//get submeter list by tenant id
router.get("/submeter/:tenant_id?", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.body.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }
    db.selectAllSubmeters(req.params.tenant_id, (results) => {
      res.json(JSON.parse(JSON.stringify(results)));
    });
  });
});

//delete submeter
router.delete("/delete_tenant", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.body.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }

    db.deleteSubmeter(req.body.tenant_id, req.body.submeter_id, (result) => {
      res.json(result);
    });
  });
});

router.post("/add_submeter", (req, res) => {
  verifyClient(req, res, (accessData, idData) => {
    var sub;
    if (accessData["cognito:groups"][0] == "Admin") {
      sub = req.body.sub;
    } else if (accessData["cognito:groups"][0] == "PropertyManager") {
      sub = accessData.sub;
    } else {
      res.json({
        error: {
          message: "Improper permissions: not Admin",
        },
      });
      return;
    }

    db.insertSubmeter(req.body.submeter_info, (result) => {
      res.json(result);
    });
  });
});
module.exports = router;
