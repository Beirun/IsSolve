import express from "express";
import pool from "../config/db.js";

const app = express.Router();

app.post("/", async (req, res) => {
  try {
    const { ctzn_id, rprt_id, comment_message, comment_date } = req.body;
    const newComment = await pool.query(
      "INSERT INTO comment (ctzn_id, rprt_id, comment_message, comment_date) VALUES ($1, $2, $3, $4) RETURNING *;",
      [ctzn_id, rprt_id, comment_message, comment_date]
    );
    res.json(newComment.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//get comments of report
app.get("/report/:id/citizen/:ctzn_id", async (req, res) => {
  try {
    const { id, ctzn_id } = req.params;
    const getComments = await pool.query(
        `SELECT 
            c.*, 
            cz.ctzn_profileimage,
            cz.ctzn_firstname, 
            cz.ctzn_lastname,
            cr.ctzn_id AS "reactor_id",
            COALESCE(total_reacts.total_count, 0) AS total_reacts
        FROM 
            comment c
        JOIN 
            citizen cz 
        ON 
            c.ctzn_id = cz.ctzn_id
        LEFT JOIN 
            commentreact cr 
        ON 
            c.comment_id = cr.comment_id AND cr.ctzn_id = $2
        LEFT JOIN (
            SELECT 
                comment_id, 
                COUNT(*) AS total_count 
            FROM 
                commentreact 
            GROUP BY 
                comment_id
        ) total_reacts 
        ON 
            c.comment_id = total_reacts.comment_id
        WHERE 
            c.rprt_id = $1
        ORDER BY c.comment_date DESC;`,
      [id, ctzn_id]
    );
    res.json(getComments.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default app;
