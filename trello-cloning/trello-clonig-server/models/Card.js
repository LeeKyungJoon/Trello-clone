const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cardSchema = new Schema({
  cardtitle: { type: String, required: true },
  list: {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
});

module.exports = Card = mongoose.model('Card', cardSchema);