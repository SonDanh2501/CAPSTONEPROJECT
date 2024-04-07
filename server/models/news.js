const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    thumb: {
      type: String,
    },
    content: {
      type: Array,
      required: true,
    },
    sysFlag: {
      type: Number,
      enum: [1, 0],
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("News", newsSchema);
