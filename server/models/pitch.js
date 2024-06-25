const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var pitchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: Array,
      required: true,
    },
    address: {
      type: Array,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      required: true,
    },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    price_morning: {
      type: Number,
      require: true,
    },
    price_evening: {
      type: Number,
    },
    price_afternoon: {
      type: Number,
    },
    thumb: {
      type: String,
    },
    images: {
      type: Array,
    },
    ratings: [
      {
        star: { type: Number },
        postedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        comment: { type: String },
        updatedAt: { type: Date },
      },
    ],
    totalRatings: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Empty", "Booked", "Maintain"],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
pitchSchema.pre("save", function (next) {
  if (this.price_morning && !this.price_evening) {
    this.price_evening = this.price_morning;
  }
  next();
});
pitchSchema.pre("save", function (next) {
  if (this.price_morning && !this.price_afternoon) {
    this.price_afternoon = this.price_morning;
  }
  next();
});
//Export the model
module.exports = mongoose.model("Pitch", pitchSchema);
