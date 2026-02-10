const express = require("express");
const axios = require("axios");
const { route } = require("./documents");
const Document = require("../models/document");

const router = express.Router();

router.get("/fetch",async (req,res) => {
    try{
        const subreddit = req.query.q;

        const response = await axios.get(
            `https://www.reddit.com/r/${subreddit}/new.json?limit=25`,
            {
                headers:{
                    "User-Agent":"SearchEngineBot/1.0"
                }
            }
        );

        const posts = response.data.data.children;

        const documents = posts
            .filter(post=>post?.kind==='t3')
            .map(post => ({
            title: post.data.title,
            content: post.data.selftext,
            url: `https://reddit.com${post.data.permalink}`,
            source: "reddit"
        }));

        for(const doc of documents){
            await Document.updateOne(
                {url: doc.url}, //finds the post's URL
                {$setOnInsert: doc}, //only insert if the doc does not exisat
                {upsert: true} //if cant find it , insert it
            )
        }
 
        res.json({saved: documents.length});

    }catch(error){
        console.error(error.message);
        res.status(500).json({error: "Failed to fetch Reddit data"});        
    }
})

module.exports = router;