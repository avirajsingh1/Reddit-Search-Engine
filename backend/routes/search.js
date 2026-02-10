const express = require("express")
const Document = require("../models/document")

const router = express.Router();

router.get("/search", async (req,res) => {
    const query = req.query.q;

    if(!query){
        return res.status(400).json("error: Query is missing!");
    }

    const results = await Document.find(
        {$text: {$search: query}},
        {score: {$meta: "textScore"}}
    )
    .sort({score: {$meta: "textScore"}})
    .limit(10);

    console.log(results[0]);

    res.json(results);
});

module.exports = router;