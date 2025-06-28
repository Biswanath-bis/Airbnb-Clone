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


module.exports.filterslistings=async(req,res)=>{
  const{category}=req.params;
  console.log(category,".............");
 const allListings=  await Listing.find({category});
 console.log(allListings,"........");
 res.render("listings/category.ejs",{allListings});
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
  let originalImageUrl = listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
  res.render("listings/edit.ejs", { listing,originalImageUrl });
};


//Update Route
// /listings/:id
module.exports.editListing = async (req, res) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data for listing");
    // }
  let { id } = req.params;
  let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image={url,filename};
    await listing.save();
  }

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