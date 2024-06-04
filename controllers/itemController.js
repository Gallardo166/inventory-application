import Item from "../models/item.js";
import Brand from "../models/brand.js";
import Category from "../models/category.js";
import asyncHandler from "express-async-handler";

const index = asyncHandler(async (req, res, next) => {
  const [brandCount, categoryCount, itemCount] = await Promise.all([
    Brand.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
    Item.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Inventory App",
    brandCount,
    categoryCount,
    itemCount,
  });
});

const item_list = asyncHandler(async (req, res, next) => {
  const allItems = !req.query.search
    ? await Item.find().sort({ name: 1 }).exec()
    : await Item.find({ name: new RegExp(req.query.search, "i") }).exec();

  res.render("item_list", {
    title: "Items",
    allItems,
    searchPlaceholder: "Item name..."
  })
});

const item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").populate("brands").exec();

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("item_detail", {
    title: `${item.name} | Details`,
    item,
  })
});

const item_create_get = asyncHandler(async (req, res, next) => {

});

const item_create_post = asyncHandler(async (req, res, next) => {

});

const item_delete_get = asyncHandler(async (req, res, next) => {

});

const item_delete_post = asyncHandler(async (req, res, next) => {

});

const item_update_get = asyncHandler(async (req, res, next) => {

});

const item_update_post = asyncHandler(async (req, res, next) => {

});

export { index, item_list, item_detail, item_create_get, item_create_post, item_delete_get, item_delete_post, item_update_get, item_update_post };