const express = require("express");
const Document = require("../models/document");

const router = express.Router();

router.post("/add", async(req,res) => {
    try{
        const doc = new Document(req.body);
        await doc.save();
        res.status(201).json(doc);
    }catch(error){
        res.status(400).json({error: error.message});
    }
});

module.exports = router;