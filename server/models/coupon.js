const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        role: {
            type: String,
        }

    },
);

//Export the model
module.exports = mongoose.model("Coupon", couponSchema);
