const mongoose =require("mongoose");


const listingSchema=new  mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    
    image: {
        type: String,
        default: "https://unsplash.com/photos/a-mountain-under-a-starry-night-sky-tuRraTuflBA",
        set:  (v) => v === "https://unsplash.com/photos/a-mountain-under-a-starry-night-sky-tuRraTuflBA" ? "default valur" : v,
    },
    price: Number,
    location: String,
    country: String,


});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;