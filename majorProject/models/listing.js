const mongoose =require("mongoose");


const listingSchema=new  mongoose.Schema({
    title:{
        type:String,
        required:true,
    },

    image:{
        type:String,
        filename:String,
        default:"unsplash.com/photos/a-large-body-of-water-surrounded-by-mountains-Pdt70B6EoHI",
        set: (v)=> v===""? "https://unsplash.com/photos/a-large-body-of-water-surrounded-by-mountains-Pdt70B6EoHI":v,
   
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
       
    },
    county:{
        type:String,
      
    },
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;