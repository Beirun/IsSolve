import express from "express";
import pool from "../config/db.js";

const app = express.Router();

app.post("/", async (req, res) => {
    try {
        const { ctzn_id, rprt_id, resolve_description, resolve_proofimage, resolve_date } = req.body;
        const newResolve = await pool.query(
            "INSERT INTO resolve (ctzn_id, rprt_id, resolve_description, resolve_proofimage, resolve_date) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
             [ctzn_id, rprt_id, resolve_description, resolve_proofimage, resolve_date]
            );
        
        res.json(newResolve.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//update report status to in progress
app.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReport = await pool.query("UPDATE report SET status = 'IN PROGRESS' WHERE rprt_id = $1 RETURNING *;", [id]);
        res.json(updatedReport.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


//update report status to resolved
app.put("/resolve/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReport = await pool.query("UPDATE report SET status = 'RESOLVED' WHERE rprt_id = $1 RETURNING *;", [id]);
        res.json(updatedReport.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const resolve = await pool.query("SELECT * FROM resolve WHERE rprt_id = $1;", [id]);
        res.json(resolve.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default app;