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

async function itemCreate(index, name, category, brands, description, variants) {
  const itemdetail = {
    name,
    category,
    brands,
    description,
    variants,
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
      [
        {
          name: "9",
          price: 1.1,
          stock: 414,
        },
        {
          name: "11",
          price: 1.1,
          stock: 239,
        },
        {
          name: "13",
          price: 1.1,
          stock: 291,
        },
        {
          name: "14",
          price: 1.1,
          stock: 231,
        },
        {
          name: "16",
          price: 1.1,
          stock: 403,
        },
        {
          name: "18",
          price: 1.1,
          stock: 329,
        },
        {
          name: "21",
          price: 1.1,
          stock: 110,
        },
        {
          name: "22",
          price: 1.1,
          stock: 123,
        }
      ]
    ),
    itemCreate(1,
      "DPX5 ORGAN NEEDLES Buttonhole Industrial Sewing Machine Needles",
      categories[0],
      [brands[1]],
      "Used for Buttonhole Industrial Sewing Machines.\n\n10 Pieces / Box\n\nSpandex/t-shirt material #9-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      [
        {
          name: "9",
          price: 1.1,
          stock: 485,
        },
        {
          name: "11",
          price: 1.1,
          stock: 446,
        },
        {
          name: "13",
          price: 1.1,
          stock: 74,
        },
        {
          name: "14",
          price: 1.1,
          stock: 324,
        },
        {
          name: "16",
          price: 1.1,
          stock: 442,
        },
        {
          name: "18",
          price: 1.1,
          stock: 344,
        },
        {
          name: "21",
          price: 1.1,
          stock: 415,
        },
        {
          name: "22",
          price: 1.1,
          stock: 489,
        }
      ]
    ),
    itemCreate(2,
      "DCX1 Overlock Sewing Machine Needles",
      categories[0],
      [brands[3], brands[4], brands[5], brands[6]],
      "Used for industrial and home overlock sewing machines.\n\n10 Pieces / Box\n\nSpandex/t-shirt material #9-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      [
        {
          name: "9",
          price: 0.4,
          stock: 580,
        },
        {
          name: "11",
          price: 0.4,
          stock: 464,
        },
        {
          name: "13",
          price: 0.4,
          stock: 515,
        },
        {
          name: "14",
          price: 0.4,
          stock: 476,
        },
        {
          name: "16",
          price: 0.4,
          stock: 575,
        },
        {
          name: "18",
          price: 0.4,
          stock: 587,
        },
        {
          name: "21",
          price: 0.4,
          stock: 586,
        },
      ]
    ),
    itemCreate(3,
      "DBX1 GROZ BECKERT Industry Sewing Machine Needles",
      categories[0],
      [brands[2]],
      "Used for Needle 1 Industry Sewing Machines.\n\n10 Pieces / Box\n\nSpandex/t-shirt material #11-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      [
        {
          name: "9",
          price: 1.2,
          stock: 43,
        },
        {
          name: "11",
          price: 1.2,
          stock: 20,
        },
        {
          name: "13",
          price: 1.2,
          stock: 22,
        },
        {
          name: "14",
          price: 1.2,
          stock: 29,
        },
        {
          name: "16",
          price: 1.2,
          stock: 9,
        },
        {
          name: "18",
          price: 1.2,
          stock: 30,
        },
        {
          name: "21",
          price: 1.2,
          stock: 31,
        },
      ]
    ),
    itemCreate(4,
      "TQX7 ORGAN NEEDLES Juki Button Industry Sewing Machine Needle",
      categories[0],
      [brands[1]],
      "Used for Juki Button Industry Sewing Machines.\n\n10 Pieces / Box\n\nSpandex/t-shirt material #11-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      [
        {
          name: "11",
          price: 0.5,
          stock: 68,
        },
        {
          name: "13",
          price: 0.5,
          stock: 87,
        },
        {
          name: "14",
          price: 0.5,
          stock: 46,
        },
        {
          name: "16",
          price: 0.5,
          stock: 67,
        },
        {
          name: "18",
          price: 0.5,
          stock: 96,
        },
      ]
    ),
    itemCreate(5,
      "DCX1 DCX27 GROZ BECKERT Overlock Sewing Machine Needles",
      categories[0],
      [brands[2]],
      "Used for Industrial and Home Overlock Sewing Machines\n\n10 Pieces / Box\n\nSpandex/t-shirt material #11-#14\nMaterial Denim/jacket/bag/leather #16-#21\nOr according to the thickness of the material.",
      [
        {
          name: "11",
          price: 0.9,
          stock: 9,
        },
        {
          name: "13",
          price: 0.9,
          stock: 10,
        },
        {
          name: "14",
          price: 0.9,
          stock: 10,
        },
        {
          name: "16",
          price: 0.9,
          stock: 10,
        },
        {
          name: "18",
          price: 0.9,
          stock: 7,
        },
      ]
    ),
    itemCreate(6,
      "HAX1 BUTTERFLY Portable Traditional Sewing Machine Needles",
      categories[0],
      [brands[0]],
      "Used for Portable Traditional Sewing Machines.\n\n10 Pieces / Box\n\nRecommended Usage:\n\n#9 for sewing very thin materials such as silk, etc. \n#11 for chiffon, etc.\n#13 for thin cotton\n#14 for thick cotton\n#16 for light denim\n#18 for denim\n#21 for thick denim - kulsin",
      [
        {
          name: "9",
          price: 0.4,
          stock: 0,
        },
        {
          name: "11",
          price: 0.4,
          stock: 0,
        },
        {
          name: "13",
          price: 0.4,
          stock: 0,
        },
        {
          name: "14",
          price: 0.4,
          stock: 0,
        },
        {
          name: "16",
          price: 0.4,
          stock: 0,
        },
        {
          name: "18",
          price: 0.4,
          stock: 0,
        },
        {
          name: "21",
          price: 0.8,
          stock: 0,
        },
      ]
    ),
    itemCreate(7,
      "Garment Scissors",
      categories[1],
      [brands[7]],
      "Used for tailor fabric and garment material.",
      [
        {
          name: "8in",
          price: 4.3,
          stock: 9,
        },
        {
          name: "9in",
          price: 4.5,
          stock: 8,
        },
        {
          name: "10in",
          price: 4.9,
          stock: 5,
        },
        {
          name: "12in",
          price: 5.5,
          stock: 6,
        },
      ]
    ),
    itemCreate(8,
      "Crooked Scissors",
      categories[1],
      [],
      "Used for embroidery, leather fabric and garment tailor material\n\nLength (including handle): 12cm",
      [
        {
          name: null,
          price: 1.2,
          stock: 305,
        },
      ]
    ),
    itemCreate(9,
      "Plastic Handle Thread Scissors",
      categories[1],
      [brands[8]],
      "These scissors are usually used to clean remaining threads on clothes or for other needs.\n\nThere is a spring so that the position of the scissors blades is always open, to cut you only need gentle pressure.",
      [
        {
          name: null,
          price: 0.4,
          stock: 238,
        },
      ]
    ),
    itemCreate(10,
      "Fabric Scissors",
      categories[1],
      [brands[8]],
      "Rubber coated handle.",
      [
        {
          name: "10in",
          price: 10,
          stock: 14,
        },
        {
          name: "11in",
          price: 10,
          stock: 0,
        },
        {
          name: "12in",
          price: 10,
          stock: 4,
        },
      ]
    ),
    itemCreate(11,
      "8 Facet Knife KM OCTA Portable Material Cutting Machine RS-100 / RC-100 - Grade A",
      categories[2],
      [brands[9], brands[10], brands[11]],
      "Octagonal Knife (8 Facets) For Octa / Kaisiman Brand Portable Cutting Machines.",
      [
        {
          name: "Standard",
          price: 1.4,
          stock: 95,
        },
        {
          name: "Grade A",
          price: 3.7,
          stock: 93,
        },
        {
          name: "Golden Eagle TW",
          price: 4.6,
          stock: 89,
        },
        {
          name: "14",
          price: 1.1,
          stock: 231,
        },
        {
          name: "16",
          price: 1.1,
          stock: 403,
        },
        {
          name: "18",
          price: 1.1,
          stock: 329,
        },
        {
          name: "21",
          price: 1.1,
          stock: 110,
        },
        {
          name: "22",
          price: 1.1,
          stock: 123,
        }
      ]
    ),
    itemCreate(12,
      "Round Blade for Cloth Cutting Machine, 4 1/4 in Degree - Standard",
      categories[2],
      [brands[9], brands[10], brands[11]],
      "Type ST-260\n\n4 1/4 inch Round Knife for Sulee Kaisiman Throwing Fabric Cutting Machine.",
      [
        {
          name: "Standard",
          price: 2.4,
          stock: 16,
        },
        {
          name: "Grade A",
          price: 3.5,
          stock: 36,
        },
        {
          name: "Golden Eagle TW",
          price: 9.8,
          stock: 12,
        },
      ]
    ),
    itemCreate(13,
      "M194 KM T Wrench KM M-194 Cutting Machine Knife Bolt Opener",
      categories[2],
      [],
      "For KM cutting machines measuring 5in to 10in.\n\nSuitable for fabric cutting machines of brands:\n- KM\n- Kaisiman\n- Simaru\n- CNY\n- Stao \n- Etc..",
      [
        {
          name: "null",
          price: 0.6,
          stock: 149,
        },
      ]
    ),
    itemCreate(14,
      "KM OCTA Portable Cutting Machine Bottom Blade",
      categories[2],
      [],
      "Lower Knife for Octa / Kaisiman Brand Portable Cutting Machines.",
      [
        {
          name: null,
          price: 1.5,
          stock: 223,
        },
      ]
    ),
    itemCreate(15,
      "VAN BELT Overlock Industrial Sewing Machine",
      categories[3],
      [],
      "V Belt for sewing machine dynamos and serger machines.\nGood quality.",
      [
        {
          name: "32",
          price: 0.5,
          stock: 441,
        },
        {
          name: "33",
          price: 0.5,
          stock: 434,
        },
        {
          name: "34",
          price: 0.5,
          stock: 304,
        },
        {
          name: "35",
          price: 0.5,
          stock: 428,
        },
        {
          name: "36",
          price: 0.5,
          stock: 465,
        },
        {
          name: "37",
          price: 0.5,
          stock: 120,
        },
        {
          name: "38",
          price: 0.5,
          stock: 0,
        },
        {
          name: "39",
          price: 0.5,
          stock: 250,
        },
        {
          name: "40",
          price: 0.5,
          stock: 341,
        },
        {
          name: "41",
          price: 0.5,
          stock: 450,
        }
      ]
    ),
    itemCreate(16,
      "Industrial Sewing Machine Dynamo Cotton Canvas",
      categories[3],
      [],
      "Used in sewing machine dynamos, overlock machine dynamos, etc.",
      [
        {
          name: null,
          price: 0.2,
          stock: 381,
        },
      ]
    ),
    itemCreate(17,
      "Dynamo Switch On Off Dynamo Switch for Industrial Sewing Machines",
      categories[3],
      [brands[9], brands[12]],
      "Suitable for all brands of industrial sewing machine dynamo of type Clutch Motor 250 Watt, 400 Watt, and Induction Motor 1/4 HP etc.",
      [
        {
          name: "Standard",
          price: 1.2,
          stock: 274,
        },
        {
          name: "Grade A",
          price: 1.8,
          stock: 497,
        },
      ]
    ),
  ]);
}
