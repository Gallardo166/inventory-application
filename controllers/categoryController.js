import Category from "../models/category.js";
import Item from "../models/item.js"
import asyncHandler from "express-async-handler";
import singularize from "../singularize.js";
import { body, validationResult } from "express-validator";

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
    categorySingular: singularize(category.name),
    allItemsInCategory,
    searchPlaceholder: "Item name...",
  })
});

const category_create_get = async (req, res, next) => {
  res.render("category_form", {
    title: "Create Category",
    header: "Create Category",
  });
};

const category_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 }).withMessage("Please fill in the category name.")
    .isLength({ min: 3 }).withMessage("Name should be at least 3 characters.")
    .isLength({ max: 100 }).withMessage("Name should not exceed 100 characters.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
    })
    
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        header: "Create Category",
        category,
        errors: errors.array(),
      });
      return;
    }
    await category.save();
    res.redirect(category.url);
  }),
];

const category_delete_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    res.redirect("/inventory/categories");
  }

  res.render("category_delete", {
    title: `Delete ${category.name}`,
    header: "Delete Category",
    category,
  });
});

const category_delete_post = asyncHandler(async (req, res, next) => {
  const allItemsInCategory = await Item.find({ category: req.params.id }).exec();
  await Item.deleteMany({ _id: { $in: allItemsInCategory.map(item => item._id ) } });
  await Category.findByIdAndDelete(req.params.id);
  res.redirect("/inventory/categories");
});

const category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category === null) {
    const err = new Error("Category not found.");
    err.status = 404;
    return next(err);
  }

  res.render("category_form", {
    title: `Update ${category.name}`,
    header: "Update Category",
    category,
  });
});

const category_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 }).withMessage("Please fill in the category name.")
    .isLength({ min: 3 }).withMessage("Name should be at least 3 characters.")
    .isLength({ max: 100 }).withMessage("Name should not exceed 100 characters.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      _id: req.params.id,
    })
    
    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: `Update ${category.name}`,
        header: "Update Category",
        category,
        errors: errors.array(),
      });
      return;
    }
    const updatedCategory = await Category.findByIdAndUpdate(category._id, category, {});
    res.redirect(updatedCategory.url);
  })
];

export { category_list, category_detail, category_create_get, category_create_post, category_delete_get, category_delete_post, category_update_get, category_update_post };