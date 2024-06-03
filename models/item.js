import mongoose from "mongoose";

const Schema = mongoose.Schema;

const VariantSchema = new Schema({
  name: {
    type: String,
    maxLength: 120,
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
  }
});

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
  variants: [VariantSchema],
});

ItemSchema.virtual("url").get(function () {
  return `/inventory/item/${this._id}`;
});

ItemSchema.virtual("total_stock").get(function () {
  return this.variants.reduce((total, current) => total + current.stock, 0);
});

ItemSchema.virtual("default_price").get(function () {
  return this.variants[0].price;
})

export default mongoose.model("Item", ItemSchema);