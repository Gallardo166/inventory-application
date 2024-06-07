import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    maxLength: 120,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  brands: [
    {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
  ],
  description: {
    type: String,
    maxLength: 550,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  stock: {
    type: Number,
    min: 0,
    required: true,
  },
  imageurl: {
    type: String,
  }
});

ItemSchema.virtual("url").get(function () {
  return `/inventory/item/${this._id}`;
});

export default mongoose.model("Item", ItemSchema);