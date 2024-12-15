import nodemailer from "nodemailer";
import dotenv from "dotenv";
import pool from "../config/db.js";
import express from "express";
dotenv.config();

const app = express.Router();


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

app.post("/send", async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Password Reset Verification Code",
            text: `Your verification code is: ${verificationCode}`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Verification code sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post("/email/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const { password } = req.body;
        const user = await pool.query("UPDATE citizen SET ctzn_password = $1 WHERE ctzn_email = $2 RETURNING *;", [password, email]);
        res.json(user.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

export default app