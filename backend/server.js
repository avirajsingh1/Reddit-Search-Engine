const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db.js");

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/document",require("./routes/documents.js"));
app.use("/api/reddit",require("./routes/reddit.js"));
app.use("/api",require("./routes/search.js"));

app.get("/",(req,res) => {
    res.send("Search Engine Api Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`);
    
})