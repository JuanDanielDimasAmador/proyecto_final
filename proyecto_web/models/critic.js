const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CriticSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "users" },
    place: { type: Schema.Types.ObjectId, ref: "places"  },
    title: { type: String, required: true },
    text: { type: String, required: true },
    classification: { type: String, default: "Critica", required: true},
    likes: [ {
        user: { type: Schema.Types.ObjectId, ref: "users" }
    } ],
    comments: [ {
        user: { type: Schema.Types.ObjectId, ref: "users" },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now() }
    } ],
    date: { type: Date, default: Date.now() }
});


module.exports = Critic = mongoose.model("critic",CriticSchema);