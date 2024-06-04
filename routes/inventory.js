import express from "express";
import { brand_list, brand_detail, brand_create_get, brand_create_post, brand_delete_get, brand_delete_post, brand_update_get, brand_update_post } from "../controllers/brandController.js";
import { category_list, category_detail, category_create_get, category_create_post, category_delete_get, category_delete_post, category_update_get, category_update_post } from "../controllers/categoryController.js";
import { index, item_list, item_detail, item_create_get, item_create_post, item_delete_get, item_delete_post, item_update_get, item_update_post } from "../controllers/itemController.js";

const router = express.Router();

router.get("/", index);

router.get("/brands", brand_list);

router.get("/brand/create", brand_create_get);

router.post("/brand/create", brand_create_post);

router.get("/brand/delete/:id", brand_delete_get);

router.post("/brand/delete/:id", brand_delete_post);

router.get("/brand/update/:id", brand_update_get);

router.post("/brand/update/:id", brand_update_post);

router.get("/brand/:id", brand_detail);

router.get("/categories", category_list);

router.get("/category/create", category_create_get);

router.post("/category/create", category_create_post);

router.get("/category/delete/:id", category_delete_get);

router.post("/category/delete/:id", category_delete_post);

router.get("/category/update/:id", category_update_get);

router.post("/category/update/:id", category_update_post);

router.get("/category/:id", category_detail);

router.get("/items", item_list);

router.get("/item/create", item_create_get);

router.post("/item/create", item_create_post);

router.get("/item/delete/:id", item_delete_get);

router.post("/item/delete/:id", item_delete_post);

router.get("/item/update/:id", item_update_get);

router.post("/item/update/:id", item_update_post);

router.get("/item/:id", item_detail);

export default router;
