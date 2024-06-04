import Category from "../models/category.js";
import Item from "../models/item.js"
import asyncHandler from "express-async-handler";

const category_list = asyncHandler(async (req, res, next) => {
  const allCategories = !req.query.search
    ? await Category.find().sort({ name: 1 }).exec()
    : await Category.find({ name: new RegExp(req.query.search, "i") }).exec();

  res.render("category_list", {
    title: "Categories",
    allCategories,
    searchPlaceholder: "Category name...",
  });
});

const category_detail = asyncHandler(async (req, res, next) => {
  const [category, allItemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    !req.query.search
      ? Item.find({ category: req.params.id }).sort({ name: 1 }).exec()
      : Item.find({ category: req.params.id, name: new RegExp(req.query.search, "i") }).exec(),
  ]);

  if (category === null) {
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    title: `${category.name} | Details`,
    category,
    allItemsInCategory,
    searchPlaceholder: "Item name...",
  })
});

const category_create_get = asyncHandler(async (req, res, next) => {

});

const category_create_post = asyncHandler(async (req, res, next) => {

});

const category_delete_get = asyncHandler(async (req, res, next) => {

});

const category_delete_post = asyncHandler(async (req, res, next) => {

});

const category_update_get = asyncHandler(async (req, res, next) => {

});

const category_update_post = asyncHandler(async (req, res, next) => {

});

export { category_list, category_detail, category_create_get, category_create_post, category_delete_get, category_delete_post, category_update_get, category_update_post };