import Item from "../models/item.js";
import Brand from "../models/brand.js";
import Category from "../models/category.js";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

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
  const [allCategories, allBrands] = await Promise.all([
    Category.find().sort({ name: 1 }).exec(),
    Brand.find().sort({ name: 1 }).exec(),
  ]);

  res.render("item_form", {
    title: "Create Item",
    header: "Create Item",
    allCategories,
    allBrands,
  });
});

const item_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 }).withMessage("Name must not be empty.")
    .isLength({ max: 120 }).withMessage("Name should not exceed 120 characters.")
    .escape(),
  body("description")
    .trim()
    .isLength({ min: 1 }).withMessage("Description must not be empty.")
    .isLength({ max: 550 }).withMessage("Description should not exceed 550 characters.")
    .escape(),
  body("category")
    .trim()
    .isLength({ min: 1 }).withMessage("Please select a category")
    .escape(),
  body("brands.*").escape(),
  body("price")
    .trim()
    .isNumeric().withMessage("Price should be number.")
    .escape(),
  body("stock")
    .trim()
    .isNumeric().withMessage("Stock should be a number.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      category: req.body.category,
      brands: typeof req.body.brands === "undefined" ? [] : req.body.brands,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      const [allCategories, allBrands] = await Promise.all([
        Category.find().sort({ name: 1 }).exec(),
        Brand.find().sort({ name: 1 }).exec(),
      ]);

      res.render("item_form", {
        title: "Create Item",
        header: "Create Item",
        item,
        allCategories,
        allBrands,
        errors: errors.array(),
      });
      return;
    }
    await item.save();
    res.redirect(item.url);
  })
]

const item_delete_get = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("category").populate("brands").exec();

  if (item === null) {
    res.redirect("/inventory/items");
  }

  res.render("item_delete", {
    title: `Delete ${item.name}`,
    item,
  });
});

const item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/inventory/items");
});

const item_update_get = asyncHandler(async (req, res, next) => {
  const [item, allCategories, allBrands] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Category.find().sort({ name: 1}).exec(),
    Brand.find().sort({ name: 1 }).exec(),
  ]);

  if (item === null) {
    const err = new Error("Item not found.");
    err.status = 404;
    return next(err);
  }

  res.render("item_form", {
    title: `Update ${item.name}`,
    header: "Update Item",
    item,
    allCategories,
    allBrands,
  });
});

const item_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 }).withMessage("Please fill in the item name.")
    .isLength({ max: 120 }).withMessage("Name should not exceed 120 characters.")
    .escape(),
  body("description")
    .trim()
    .isLength({ min: 1 }).withMessage("Please fill in the item description.")
    .isLength({ max: 550 }).withMessage("Description should not exceed 550 characters.")
    .escape(),
  body("category")
    .trim()
    .isLength({ min: 1 }).withMessage("Please select a category.")
    .escape(),
  body("brands.*").escape(),
  body("price")
    .trim()
    .isNumeric().withMessage("Price should be number.")
    .escape(),
  body("stock")
    .trim()
    .isNumeric().withMessage("Stock should be a number.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      category: req.body.category,
      brands: typeof req.body.brands === "undefined" ? [] : req.body.brands,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      const [allCategories, allBrands] = await Promise.all([
        Category.find().sort({ name: 1 }).exec(),
        Brand.find().sort({ name: 1 }).exec(),
      ]);

      res.render("item_form", {
        title: `Update ${item.name}`,
        item,
        allCategories,
        allBrands,
        header: "Update Item",
        errors: errors.array(),
      });
      return
    }
    const updatedItem = await Item.findByIdAndUpdate(item._id, item, {});
    res.redirect(updatedItem.url);
  }),
]

export { index, item_list, item_detail, item_create_get, item_create_post, item_delete_get, item_delete_post, item_update_get, item_update_post };