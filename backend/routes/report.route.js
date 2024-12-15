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

//get issue type counts
app.get("/count/type", async (req, res) => {
    try {
        const report = await pool.query(`SELECT issue_type, COUNT(*) AS count FROM report GROUP BY issue_type;`);
        res.json(report.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//get issue status counts
app.get("/count/status", async (req, res) => {
    try {
        const report = await pool.query(`SELECT status as label, COUNT(*) AS value FROM report GROUP BY status;`);
        res.json(report.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//get report count
app.get("/count/report", async (req, res) => {
    try {
        const report = await pool.query(`select date_trunc('month',rprt_date) as month, COUNT(*) as count from report group by date_trunc('month',rprt_date);`);
        res.json(report.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
})

//get all reports
app.get("/", async (req, res) => {
    try {
        const allReports = await pool.query("SELECT * FROM report ORDER BY rprt_date DESC;");
        res.json(allReports.rows);
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


//get 3 recent reports
app.get("/recent", async (req, res) => {
    try {
        const report = await pool.query(`SELECT * FROM report ORDER BY rprt_date DESC LIMIT 3;`);
        res.json(report.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//get trending report
app.get("/trending", async (req, res) => {
    try {
        const report = await pool.query(`SELECT r.*, 
                c.ctzn_firstname, 
                c.ctzn_lastname, 
                c.ctzn_profileimage,
                pr.ctzn_id AS "reactor_id",
                COALESCE(total_reacts.total_count, 0) AS total_reacts
            FROM report r 
            JOIN citizen c ON r.ctzn_id = c.ctzn_id 
            LEFT JOIN 
                reportreact pr 
            ON 
                r.rprt_id = pr.rprt_id
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
            WHERE r.status IN ('PENDING', 'IN PROGRESS')
            ORDER BY total_reacts DESC;`);
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


//get reports of citizen
app.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const allReports = await pool.query("SELECT * FROM report WHERE ctzn_id = $1 ORDER BY rprt_date DESC;", [id]);
        res.json(allReports.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


export default app;