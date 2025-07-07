const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl=ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) =>( {...obj, owner: "684e965b2aaf00f3fef44aac"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
 

initDB();


//WITH THE HELP OF ENUM ADD RANDOMLY
// const initDB = async () => {
//   await Listing.deleteMany({});
//    const categories = ["trending","rooms","iconic cities","mountains","castles","amazing pools","camping","farms","arctic","beach", "boat"];
//   initData.data = initData.data.map((obj) => {
//     const randomCategory = categories[Math.floor(Math.random() * categories.length)];
//     return {
//       ...obj,
//       owner: "684e965b2aaf00f3fef44aac",
//       category: randomCategory
//     };
//   });
//   await Listing.insertMany(initData.data);
//   console.log("data was initialized");
// };






  


