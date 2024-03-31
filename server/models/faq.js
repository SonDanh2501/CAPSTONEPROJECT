const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var faqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Faq", faqSchema);
