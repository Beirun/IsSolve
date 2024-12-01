import express from "express";
import pool from "../config/db.js";

const app = express.Router();

//create new citizen
app.post("/", async (req, res) => {
    try {
        const { firstname, lastname, username, email, password } = req.body;
        const newCitizen = await pool.query(
            "INSERT INTO citizen (ctzn_firstname, ctzn_lastname, ctzn_username, ctzn_email, ctzn_password) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
             [firstname, lastname, username, email, password]
            );
        res.json(newCitizen.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//get all citizens
app.get("/", async (req, res) => {
    try {
        const allCitizens = await pool.query("SELECT * FROM citizen;");
        res.json(allCitizens.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//get one citizen
app.get("/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const citizen = await pool.query("SELECT * FROM citizen WHERE ctzn_email = $1;", [email]);
        res.json(citizen.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//update one citizen
app.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { ctzn_firstname, ctzn_lastname, ctzn_username, ctzn_email, ctzn_password } = req.body;
        const updatedCitizen = await pool.query(
            "UPDATE citizen SET ctzn_firstname = $1, ctzn_lastname = $2, ctzn_username = $3, ctzn_email = $4, ctzn_password = $5 WHERE ctzn_id = $6 RETURNING *;",
            [ctzn_firstname, ctzn_lastname, ctzn_username, ctzn_email, ctzn_password, id]
        );
        res.json(updatedCitizen.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//delete one citizen
app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCitizen = await pool.query("DELETE FROM citizen WHERE ctzn_id = $1 RETURNING *;", [id]);
        res.json(deletedCitizen.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default app;