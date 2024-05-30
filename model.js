import Mongoose from "mongoose";

const entrySchema = new Mongoose.Schema({
  score: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
});

const Entry = Mongoose.model("Entry", entrySchema);

export default Entry;
