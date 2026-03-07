const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    label:{
        required:true,
        type:String
    },
    fullname:{
        required:true,
        type:String
    },
    street:{
        required:true,
        type:String
    },
    city:{
        required:true,
        type:String
    },
    state:{
        required:true,
        type:String
    },
    zipCode:{
        required:true,
        type:String
    },
    phone:{
        required:true,
        type:String
    },
    isDefault:{
        type:Boolean,
        default:false
    }
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    clerkID: {
      type: String,
      required: true,
      unique: true,
    },
    addresses: [AddressSchema],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
