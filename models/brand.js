import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true,
  },
});

BrandSchema.virtual("url").get(function () {
  return `/inventory/brand/${this._id}`;
});

export default mongoose.model("Brand", BrandSchema);