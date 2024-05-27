const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

let PORT = 3001;

app.listen(PORT, () => {
  console.log("running server on " + PORT);
});
const urlDb =
  "mysql://root:SvydpyiSlqiacCpOopgLkKIrBZJCLvbL@roundhouse.proxy.rlwy.net:37242/railway";
const db = mysql.createConnection(
  // {
  // host: "roundhouse.proxy.rlwy.net",
  // user: "root",
  // password: "SvydpyiSlqiacCpOopgLkKIrBZJCLvbL",
  // database: "railway",
  // }
  urlDb
);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});

// middewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Register endpoint
app.post("/api/register", (req, res) => {
  const { firstname, lastname, email, password, phonenumber, role } = req.body;
  const sql =
    "INSERT INTO users (firstname, lastname, email, password, phonenumber, role) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [firstname, lastname, email, password, phonenumber, role],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: "Error registering user" });
      } else {
        console.log(sql);
        res
          .status(201)
          .send({ message: "User registered successfully", user: req.body });
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  //   res.status(200).send({ email: email, password: password });
  const sql = "SELECT * FROM rents.users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error authenticating user" });
    } else {
      if (result.length > 0) {
        // User found, authentication successful
        res
          .status(200)
          .send({ message: "Authentication successful", user: result[0] });
      } else {
        // User not found or incorrect credentials
        res.status(401).send({ message: "Invalid email or password" });
      }
    }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql_delete = "DELETE FROM rents.properties WHERE id = ?";
  db.query(sql_delete, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

// Property Form endpoint
app.post("/api/property", (req, res) => {
  const {
    place,
    area,
    bedrooms,
    bathrooms,
    hospitals,
    colleges,
    sellerName,
    sellerEmail,
    sellerPhone,
  } = req.body;
  const sql =
    "INSERT INTO properties (place, area, bedrooms, bathrooms, hospitals, colleges,sellerName,sellerEmail,sellerPhone) VALUES (?, ?, ?, ?, ?, ?,?,?,?)";
  db.query(
    sql,
    [
      place,
      area,
      bedrooms,
      bathrooms,
      hospitals,
      colleges,
      sellerName,
      sellerEmail,
      sellerPhone,
    ],
    (err, result) => {
      if (err) {
        res.status(500).send({ message: "Error adding property" });
      } else {
        res.status(201).send({ message: "Property added successfully" });
      }
    }
  );
});

// Update Property Route
app.put("/api/property/:id", (req, res) => {
  const propertyId = req.params.id;
  const updatedData = req.body;

  const query = `
        UPDATE properties SET
        place = ?,
        area = ?,
        bedrooms = ?,
        bathrooms = ?,
        hospitals = ?,
        colleges = ?,
        sellerName = ?,
        sellerEmail = ?,
        sellerPhone = ?

        WHERE id = ?
    `;

  const values = [
    updatedData.place,
    updatedData.area,
    updatedData.bedrooms,
    updatedData.bathrooms,
    updatedData.hospitals,
    updatedData.colleges,
    updatedData.sellerName,
    updatedData.sellerEmail,
    updatedData.sellerPhone,

    propertyId,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating property:", err);
      return res.status(500).send("Internal server error");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Property not found");
    }

    res.json({ id: propertyId, ...updatedData });
  });
});

// Property List endpoint
app.get("/api/properties", (req, res) => {
  const sql = "SELECT * FROM properties";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error fetching properties" });
    } else {
      res.status(200).send(result);
    }
  });
});

// Get property by ID
app.get("/api/property/:id", (req, res) => {
  const propertyId = req.params.id;
  const sql = "SELECT * FROM rents.properties WHERE id = ?";

  db.query(sql, [propertyId], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error fetching property" });
    } else if (result.length === 0) {
      res.status(404).send({ message: "Property not found" });
    } else {
      res.status(200).send(result[0]);
    }
  });
});
