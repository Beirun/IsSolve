import express from "express";
import pool from "../config/db.js";

const app = express.Router();

app.post("/", async (req, res) => {
    try {
        const {notification_message, notification_status, ctzn_id, rprt_id, notification_date, notification_sender} = req.body;
        const newNotification = await pool.query(
            "INSERT INTO notification (notification_message, notification_status, ctzn_id, rprt_id, notification_date, notification_sender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
            [notification_message, notification_status, ctzn_id, rprt_id, notification_date, notification_sender]
        );
        res.json(newNotification.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//get notification date
app.post("/gettime", async (req, res) => {
    try {
        const {notification_message, notification_status, ctzn_id, rprt_id, notification_sender} = req.body;
        const newNotification = await pool.query(
            "SELECT notification_date FROM notification WHERE notification_message = $1 AND notification_status = $2 AND ctzn_id = $3 AND rprt_id = $4 AND notification_sender = $5 ORDER BY notification_date DESC;",
            [notification_message, notification_status, ctzn_id, rprt_id,  notification_sender]
        );
        if (newNotification.rows.length === 0) {
            res.json({ notification_date: '1999-01-01 00:00:00' });
        }
        else res.json(newNotification.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post("/commentreact", async (req, res) => {
    try {
        const {notification_message, notification_status, ctzn_id, rprt_id, comment_id, notification_date, notification_sender} = req.body;
        const newNotification = await pool.query(
            "INSERT INTO commentreactnotification (notification_message, notification_status, ctzn_id, rprt_id, comment_id, notification_date, notification_sender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
            [notification_message, notification_status, ctzn_id, rprt_id, comment_id, notification_date, notification_sender]
        )
        res.json(newNotification.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post("/commentreact/gettime", async (req, res) => {
    try {
        const {notification_message, notification_status, ctzn_id, rprt_id, comment_id, notification_sender} = req.body;
        const newNotification = await pool.query(
            "SELECT notification_date FROM commentreactnotification WHERE notification_message = $1 AND notification_status = $2 AND ctzn_id = $3 AND rprt_id = $4 AND comment_id = $5 AND notification_sender = $6 ORDER BY notification_date DESC;",
            [notification_message, notification_status, ctzn_id, rprt_id , comment_id,  notification_sender]
        );
        if (newNotification.rows.length === 0) {
            res.json({ notification_date: '1999-01-01 00:00:00' });
        }
        else res.json(newNotification.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


app.get("/citizen/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const allNotifications = await pool.query(
            `
            SELECT c.ctzn_firstname, c.ctzn_lastname, notification.*, ns.ctzn_profileimage
            FROM citizen c
            JOIN
            (
                SELECT notification_id, notification_message, notification_status, ctzn_id, notification_sender, rprt_id, notification_date
                FROM notification
                UNION
                SELECT notification_id, notification_message, notification_status, ctzn_id, notification_sender, rprt_id, notification_date
                FROM commentreactnotification
            ) notification
            ON c.ctzn_id = notification.ctzn_id
            JOIN citizen ns ON ns.ctzn_id = notification.notification_sender
            WHERE c.ctzn_id = $1
            ORDER BY notification_date DESC;
            `,
            [id]
        );

        res.json(allNotifications.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//update notification status
app.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { notification_status } = req.body;
        const updatedNotification = await pool.query("UPDATE notification SET notification_status = $1 WHERE notification_id = $2 RETURNING *;", [notification_status, id]);
        res.json(updatedNotification.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//update notification status commentreact
app.put("/commentreact/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { notification_status } = req.body;
        const updatedNotification = await pool.query("UPDATE commentreactnotification SET notification_status = $1 WHERE notification_id = $2 RETURNING *;", [notification_status, id]);
        res.json(updatedNotification.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNotification = await pool.query("DELETE FROM notification WHERE notification_id = $1 RETURNING *;", [id]);
        res.json(deletedNotification.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete("/report/:id/citizen/:ctzn_id/reactor/:reactor_id", async (req, res) => {
    try {
        const { id, ctzn_id, reactor_id } = req.params;
        const deletedNotification = await pool.query("DELETE FROM notification WHERE rprt_id = $1 AND ctzn_id = $2 AND notification_sender = $3 RETURNING *;", [id, ctzn_id, reactor_id]);
        res.json(deletedNotification.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete("/comment/:id/citizen/:ctzn_id/reactor/:reactor_id", async (req, res) => {
    try {
        const { id, ctzn_id, reactor_id } = req.params;
        const deletedNotification = await pool.query("DELETE FROM notification WHERE rprt_id = $1 AND ctzn_id = $2 AND notification_sender = $3 RETURNING *;", [id, ctzn_id, reactor_id]);
        res.json(deletedNotification.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});



export default app;



// import express from "express";
// import pool from "../config/db.js";

// const app = express.Router();

// //create comment notification
// app.post("/comment/", async (req, res) => {
//     try {
//         const { notification_message, notification_status, ctzn_id, notification_sender, rprt_id, notification_date } = req.body;
//         const newNotification = await pool.query(
//             "INSERT INTO commentnotification (notification_message, notification_status, ctzn_id, notification_sender, rprt_id, notification_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
//              [notification_message, notification_status, ctzn_id, notification_sender, rprt_id, notification_date]
//             );
//         res.json(newNotification.rows[0]);
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// })

// //create report react notification
// app.post("/report/react/", async (req, res) => {
//     try {
//         const { notification_message, notification_status, ctzn_id, notification_sender, rprt_id, notification_date } = req.body;
//         const newNotification = await pool.query(
//             "INSERT INTO reportreactnotification (notification_message, notification_status, ctzn_id, notification_sender, rprt_id, notification_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
//              [notification_message, notification_status, ctzn_id, notification_sender, rprt_id, notification_date]
//             );
//         res.json(newNotification.rows[0]);
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// })

// //create comment react notification
// app.post("/report/", async (req, res) => {
//     try {
//         const { notification_message, notification_status, ctzn_id, notification_sender, comment_id, notification_date } = req.body;
//         const newNotification = await pool.query(
//             "INSERT INTO reportnotification (notification_message, notification_status, ctzn_id, notification_sender, comment_id, notification_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
//              [notification_message, notification_status, ctzn_id, notification_sender, comment_id, notification_date]
//             );
//         res.json(newNotification.rows[0]);
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//     }
// })
        



// export default app;