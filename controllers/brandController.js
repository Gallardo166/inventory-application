import Brand from "../models/brand.js";
import Item from "../models/item.js";
import asyncHandler from "express-async-handler";
import validator from "express-validator";

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
    searchPlaceholder: "Product name..."
  });
});

const brand_create_get = asyncHandler(async (req, res, next) => {

});

const brand_create_post = asyncHandler(async (req, res, next) => {

});

const brand_delete_get = asyncHandler(async (req, res, next) => {

});

const brand_delete_post = asyncHandler(async (req, res, next) => {

});

const brand_update_get = asyncHandler(async (req, res, next) => {

});

const brand_update_post = asyncHandler(async (req, res, next) => {

});

export { brand_list, brand_detail, brand_create_get, brand_create_post, brand_delete_get, brand_delete_post, brand_update_get, brand_update_post };