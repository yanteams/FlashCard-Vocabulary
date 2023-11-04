const mongoose = require("mongoose");
const modelSchema = new mongoose.Schema({
    vocabulary: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true
    },
    sounduk: {
        type: String,
        required: true
    },
    soundus: {
        type: String,
        required: true
    },
    translate: {
        type: String,
        required: true
    },
    example: {
        type: [String],
        required: true
    },

    publishedDate: {
        type: Date,
        default: Date.now,
        get: function (date) { 
            return new Date(date).toLocaleDateString('en-US');
        }
    },

});
let Vocabulary = mongoose.model("Vocabulary", modelSchema);
module.exports = { Vocabulary };