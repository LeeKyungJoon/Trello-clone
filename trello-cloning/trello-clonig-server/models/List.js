const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  listtitle: { type: String, required: true },
  board: {
      type: Schema.Types.ObjectId,
      ref: "Board"
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card"
      }
    ]
});

module.exports = List = mongoose.model('List', listSchema);