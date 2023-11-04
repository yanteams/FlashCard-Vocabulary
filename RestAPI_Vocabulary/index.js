const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const vocabularyRoute = require("./routes/vocabulary");
dotenv.config();
// connect database
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connect successfully");
    })
    .catch((err) => {
        console.error("Error connecting to database: ", err);
    });
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));


app.use("/admin/vocabulary", vocabularyRoute);

app.listen(5555, () => {
    console.log("Server is running...");
})