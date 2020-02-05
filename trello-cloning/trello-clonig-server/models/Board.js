const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
    boardtitle: { type: String, required: true },
    ownerId: Schema.Types.ObjectId,
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List"
      }
    ]
});

module.exports = Board = mongoose.model('Board', boardSchema);

