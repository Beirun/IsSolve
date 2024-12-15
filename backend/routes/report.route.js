import express from "express";
import pool from "../config/db.js";

const app = express.Router();

app.post("/", async (req, res) => {
    try {
        const { ctzn_id, issueType, description, lat, lng, proofImage, status, date, location } = req.body;
        const newReport = await pool.query(
            "INSERT INTO report (ctzn_id, issue_type, description, latitude, longitude, img_proof, status, rprt_date, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
             [ctzn_id, issueType, description, lat, lng, proofImage, status , date, location]
            );
        res.json(newReport.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//get one report via report id
app.get("/id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const report = await pool.query("SELECT * FROM report WHERE rprt_id = $1;", [id]);
        res.json(report.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//get one report of citizen
app.get("/view/:id/citizen/:ctzn_id", async (req, res) => {
    try {
        const { id, ctzn_id } = req.params;
        const report = await pool.query(
            `SELECT r.*, 
                c.ctzn_firstname, 
                c.ctzn_lastname, 
                c.ctzn_profileimage,
                pr.ctzn_id AS "reactor_id",
                COALESCE(total_reacts.total_count, 0) AS total_reacts,
                COALESCE(total_comments.total_comments, 0) AS total_comments
            FROM report r 
            JOIN citizen c ON r.ctzn_id = c.ctzn_id 
            LEFT JOIN 
                reportreact pr 
            ON 
                r.rprt_id = pr.rprt_id AND pr.ctzn_id = $2
            LEFT JOIN (
                        SELECT 
                            rprt_id, 
                            COUNT(*) AS total_count 
                        FROM 
                            reportreact 
                        GROUP BY 
                            rprt_id
                    ) total_reacts 
            ON 
                    r.rprt_id = total_reacts.rprt_id
            LEFT JOIN
                (SELECT rprt_id, COUNT(*) AS total_comments FROM comment GROUP BY rprt_id) total_comments
            ON r.rprt_id = total_comments.rprt_id
            WHERE r.rprt_id = $1;`, [id, ctzn_id]);
        res.json(report.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//get all reports
app.get("/", async (req, res) => {
    try {
        const allReports = await pool.query("SELECT * FROM report;");
        res.json(allReports.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//get reports of citizen
app.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allReports = await pool.query("SELECT * FROM report WHERE ctzn_id = $1;", [id]);
        res.json(allReports.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


export default app;