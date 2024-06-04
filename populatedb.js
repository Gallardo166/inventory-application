#! /usr/bin/env node

console.log(
  'This script populates some test items, categories and brands to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

import Item from "./models/item.js";
import Category from "./models/category.js";
import Brand from "./models/brand.js";

const items = [];
const categories = [];
const brands = [];

import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createBrands();
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// brand[0] will always be the Butterfly brand, regardless of the order
// in which the elements of promise.all's argument complete.
async function brandCreate(index, name) {
  const brand = new Brand({ name });
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

async function categoryCreate(index, name) {
  const category = new Category({ name });

  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, category, brands, description, price, stock) {
  const itemdetail = {
    name,
    category,
    brands,
    description,
    price,
    stock,
  };

  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(0, "Butterfly"),
    brandCreate(1, "Organ Needles"),
    brandCreate(2, "Groz Beckert"),
    brandCreate(3, "Orchid"),
    brandCreate(4, "Anchor"),
    brandCreate(5, "Sogawa Garden"),
    brandCreate(6, "Strong"),
    brandCreate(7, "Feng Bao"),
    brandCreate(8, "Golden Eagle"),
    brandCreate(9, "Standard"),
    brandCreate(10, "Strong H"),
    brandCreate(11, "Wayken"),
    brandCreate(12, "Zino"),
  ]);
}

async function createCategories() {
  console.log("Adding authors");
  await Promise.all([
    categoryCreate(0, "Needles"),
    categoryCreate(1, "Scissors"),
    categoryCreate(2, "Cutters"),
    categoryCreate(3, "Dynamo"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(0,
      "DBX1 ORGAN NEEDLES Industry Sewing Machine Needles",
      categories[0],
      [brands[1]],
      "Used for sewing machines that use round needle heads (Industrial High Speed Needle 1 Sewing Machines), can also be used on traditional black sewing machines.\n\n10 Pieces / Box\n\nSpandex/t-shirt material #9-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      1.1,
      414,
    ),
    itemCreate(1,
      "DPX5 ORGAN NEEDLES Buttonhole Industrial Sewing Machine Needles",
      categories[0],
      [brands[1]],
      "Used for Buttonhole Industrial Sewing Machines.\n\n10 Pieces / Box\n\nSpandex/t-shirt material #9-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      1.1,
      485,
    ),
    itemCreate(2,
      "DCX1 Overlock Sewing Machine Needles",
      categories[0],
      [brands[3], brands[4], brands[5], brands[6]],
      "Used for industrial and home overlock sewing machines.\n\n10 Pieces / Box\n\nSpandex/t-shirt material #9-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      0.4,
      580,
    ),
    itemCreate(3,
      "DBX1 GROZ BECKERT Industry Sewing Machine Needles",
      categories[0],
      [brands[2]],
      "Used for Needle 1 Industry Sewing Machines.\n\n10 Pieces / Box\n\nSpandex/t-shirt material #11-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      1.2,
      43,
    ),
    itemCreate(4,
      "TQX7 ORGAN NEEDLES Juki Button Industry Sewing Machine Needle",
      categories[0],
      [brands[1]],
      "Used for Juki Button Industry Sewing Machines.\n\n10 Pieces / Box\n\nSpandex/t-shirt material #11-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      0.5,
      96,
    ),
    itemCreate(5,
      "DCX1 DCX27 GROZ BECKERT Overlock Sewing Machine Needles",
      categories[0],
      [brands[2]],
      "Used for Industrial and Home Overlock Sewing Machines\n\n10 Pieces / Box\n\nSpandex/t-shirt material #11-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      0.9,
      10,
    ),
    itemCreate(6,
      "HAX1 BUTTERFLY Portable Traditional Sewing Machine Needles",
      categories[0],
      [brands[0]],
      "Used for Portable Traditional Sewing Machines.\n\n10 Pieces / Box\n\nRecommended Usage:\n\n#9 for sewing very thin materials such as silk, etc. \n#11 for chiffon, etc.\n#13 for thin cotton\n#14 for thick cotton\n#16 for light denim\n#18 for denim\n#21 for thick denim - kulsin",
      0.4,
      0
    ),
    itemCreate(7,
      "Garment Scissors",
      categories[1],
      [brands[7]],
      "Used for tailor fabric and garment material.",
      4.3,
      9,
    ),
    itemCreate(8,
      "Crooked Scissors",
      categories[1],
      [],
      "Used for embroidery, leather fabric and garment tailor material\n\nLength (including handle): 12cm",
      1.2,
      305,
    ),
    itemCreate(9,
      "Plastic Handle Thread Scissors",
      categories[1],
      [brands[8]],
      "These scissors are usually used to clean remaining threads on clothes or for other needs.\n\nThere is a spring so that the position of the scissors blades is always open, to cut you only need gentle pressure.",
      0.4,
      238,
    ),
    itemCreate(10,
      "Fabric Scissors",
      categories[1],
      [brands[8]],
      "Rubber coated handle.",
      10,
      14,
    ),
    itemCreate(11,
      "8 Facet Knife KM OCTA Portable Material Cutting Machine RS-100 / RC-100 - Grade A",
      categories[2],
      [brands[9], brands[10], brands[11]],
      "Octagonal Knife (8 Facets) For Octa / Kaisiman Brand Portable Cutting Machines.",
      1.4,
      95,
    ),
    itemCreate(12,
      "Round Blade for Cloth Cutting Machine, 4 1/4 in Degree - Standard",
      categories[2],
      [brands[9], brands[10], brands[11]],
      "Type ST-260\n\n4 1/4 inch Round Knife for Sulee Kaisiman Throwing Fabric Cutting Machine.",
      2.4,
      16,
    ),
    itemCreate(13,
      "M194 KM T Wrench KM M-194 Cutting Machine Knife Bolt Opener",
      categories[2],
      [],
      "For KM cutting machines measuring 5in to 10in.\n\nSuitable for fabric cutting machines of brands:\n- KM\n- Kaisiman\n- Simaru\n- CNY\n- Stao \n- Etc..",
      0.6,
      149,
    ),
    itemCreate(14,
      "KM OCTA Portable Cutting Machine Bottom Blade",
      categories[2],
      [],
      "Lower Knife for Octa / Kaisiman Brand Portable Cutting Machines.",
      1.5,
      223,
    ),
    itemCreate(15,
      "VAN BELT Overlock Industrial Sewing Machine",
      categories[3],
      [],
      "V Belt for sewing machine dynamos and serger machines.\nGood quality.",
      0.5,
      441,
    ),
    itemCreate(16,
      "Industrial Sewing Machine Dynamo Cotton Canvas",
      categories[3],
      [],
      "Used in sewing machine dynamos, overlock machine dynamos, etc.",
      0.2,
      381,
    ),
    itemCreate(17,
      "Dynamo Switch On Off Dynamo Switch for Industrial Sewing Machines",
      categories[3],
      [brands[9], brands[12]],
      "Suitable for all brands of industrial sewing machine dynamo of type Clutch Motor 250 Watt, 400 Watt, and Induction Motor 1/4 HP etc.",
      1.2,
      274,
    ),
  ]);
}
