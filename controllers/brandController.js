import Brand from "../models/brand.js";
import Item from "../models/item.js";
import asyncHandler from "express-async-handler";
import { body, validationResult} from "express-validator";

const brand_list = asyncHandler(async (req, res, next) => {
  const allBrands = !req.query.search
    ? await Brand.find().sort({ name: 1 }).exec()
    : await Brand.find( { name: new RegExp(req.query.search, "i") }).exec();

  res.render("brand_list", {
    title: "Brands",
    allBrands,
    searchPlaceholder: "Brand name..."
  })
});

const brand_detail = asyncHandler(async (req, res, next) => {
  const [brand, allItemsInBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    !req.query.search
      ? Item.find({ brands: req.params.id }, "name total_stock").exec()
      : Item.find({ brands: req.params.id, name: new RegExp(req.query.search, "i") }).exec(),
  ]);

  if (brand === null) {
    const err = new Error("Brand not found.");
    err.status = 404;
    return next(err);
  }

  res.render("brand_detail", {
    title: `${brand.name} | Details`,
    brand,
    allItemsInBrand,
    searchPlaceholder: "Item name..."
  });
});

const brand_create_get = async (req, res, next) => {
  res.render("brand_form", {
    title: "Create Brand",
    header: "Create Brand",
  });
};

const brand_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 }).withMessage("Please fill in the brand name.")
    .isLength({ min: 3 }).withMessage("Name should be at least 3 characters.")
    .isLength({ max: 100 }).withMessage("Name should not exceed 100 characters.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const brand = new Brand({
      name: req.body.name,
    })
    
    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Create Brand",
        header: "Create Brand",
        brand,
        errors: errors.array(),
      });
      return;
    }
    await brand.save();
    res.redirect(brand.url);
  }),
];

const brand_delete_get = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id).exec();

  if (brand === null) {
    res.redirect("/inventory/brands");
  }

  res.render("brand_delete", {
    title: `Delete ${brand.name}`,
    header: "Delete Brand",
    brand,
  });
});

const brand_delete_post = asyncHandler(async (req, res, next) => {
  await Item.updateMany({ brands: req.params.id }, { $pull: { brands: req.params.id } }).exec();
  await Brand.findByIdAndDelete(req.params.id);
  res.redirect("/inventory/brands");
});

const brand_update_get = asyncHandler(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id).exec();

  if (brand === null) {
    const err = new Error("Brand not found.");
    err.status = 404;
    return next(err);
  }

  res.render("brand_form", {
    title: `Update ${brand.name}`,
    header: "Update Brand",
    brand,
  });
});

const brand_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 }).withMessage("Please fill in the brand name.")
    .isLength({ min: 3 }).withMessage("Name should be at least 3 characters.")
    .isLength({ max: 100 }).withMessage("Name should not exceed 100 characters.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const brand = new Brand({
      name: req.body.name,
      _id: req.params.id,
    })
    
    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: `Update ${brand.name}`,
        header: "Update Brand",
        brand,
        errors: errors.array(),
      });
      return;
    }
    const updatedBrand = await Brand.findByIdAndUpdate(brand._id, brand, {});
    res.redirect(updatedBrand.url);
  })
];

export { brand_list, brand_detail, brand_create_get, brand_create_post, brand_delete_get, brand_delete_post, brand_update_get, brand_update_post };