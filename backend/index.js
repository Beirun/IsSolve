import citizenRoute from "./routes/citizen.route.js";
import reportRoute from "./routes/report.route.js";
import commentRoute from "./routes/comment.route.js";
import reactRoute from "./routes/react.route.js";
import notificationRoute from "./routes/notification.route.js";
import resolveRoute from "./routes/resolve.route.js";
import resetRoute from "./routes/reset.route.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.use("/citizen", citizenRoute);
app.use("/report", reportRoute);
app.use("/comment", commentRoute);
app.use("/react", reactRoute);
app.use("/notification", notificationRoute);
app.use("/resolve", resolveRoute);
app.use("/reset", resetRoute);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});