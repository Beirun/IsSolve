import express from "express";
import pool from "../config/db.js";

const app = express.Router();

app.post("/report/", async (req, res) => {
    try {
        const { ctzn_id, rprt_id} = req.body;
        const newReact = await pool.query(
            "INSERT INTO reportreact (ctzn_id, rprt_id) VALUES ($1, $2) RETURNING *;",
             [ctzn_id, rprt_id]
            );
        res.json(newReact.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//delete one report react
app.delete("/report/:id/citizen/:ctzn_id", async (req, res) => {
    try {
        const { id, ctzn_id } = req.params;
        const deletedReact = await pool.query("DELETE FROM reportreact WHERE rprt_id = $1 AND ctzn_id = $2 RETURNING *;", [id, ctzn_id]);
        res.json(deletedReact.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


//create one comment react
app.post("/comment/", async (req, res) => {
    try {
        const { comment_id, ctzn_id} = req.body;
        const newReact = await pool.query(
            "INSERT INTO commentreact (comment_id, ctzn_id) VALUES ($1, $2) RETURNING *;",
             [comment_id, ctzn_id]
            );
        res.json(newReact.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//delete one comment react
app.delete("/comment/:comment_id/citizen/:ctzn_id", async (req, res) => {
    try {
        const { ctzn_id, comment_id } = req.params;
        const deletedReact = await pool.query("DELETE FROM commentreact WHERE ctzn_id = $1 AND comment_id = $2 RETURNING *;", [ctzn_id, comment_id]);
        res.json(deletedReact.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default app;