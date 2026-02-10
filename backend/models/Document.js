const mongoose = require("mongoose");

const documentSchema = mongoose.Schema (
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
            unique: true
        },
        source: {
            type: String,
            required: true,
            enum: ["reddit","wikipedia"]
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

documentSchema.index({
    title: "text",
    content: "text"
});

module.exports = mongoose.model("Document",documentSchema);