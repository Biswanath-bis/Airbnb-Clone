const Listing = require("../models/listing.js");

//Index Route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};


//New Route  
module.exports.renderNewForm = (req, res) => {  
  res.render("listings/new.ejs");
};


//Show Route
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id).populate({
    path:"reviews",
    populate:{    //author for indivisual Review
      path:"author",
    },
  }).populate("owner");

  //connect flash
  if(!listing){
    req.flash("error", "Listing you requested for does not exists !");
    return res.redirect("/listings"); 
  }
  console.log(listing);

  res.render("listings/show.ejs", { listing });
};


//Create Route
module.exports.createNewListing = async (req, res, next) => { 
  if (!req.file) {
    console.log("No file uploaded!");
    req.flash("error", "Image upload failed");
    return res.redirect("/listings/new");
  }
    let url = req.file.path;
    let filename = req.file.filename; 
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
  };


//Edit Route
// /listings/:id/edit
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  // connect-flash
  if(!listing){
    req.flash("error", "Listing you requested for does not exists !");
    return res.redirect("/listings"); 
  }
  res.render("listings/edit.ejs", { listing });
};


//Update Route
// /listings/:id
module.exports.editListing = async (req, res) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data for listing");
    // }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
 };


 //Delete Route
 module.exports.deleteListing = async (req, res) => {
   let { id } = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success", " Listing Deleted");
   res.redirect("/listings");
 };