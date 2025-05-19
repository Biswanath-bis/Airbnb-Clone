const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");



app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended : true}));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


main().then((res)=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

} 



app.get("/",(req,res)=>{
   res.send("ready for the major project");
});


  //home route
app.get("/listings",wrapAsync(async(req,res)=>{
   const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});

}));
//new route
app.get("/listings/new", (req,res)=>{
  res.render("listings/new.ejs");
});

 //show route
app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let{id}=req.params;
    const list= await Listing.findById(id);
    console.log(list);
    res.render("listings/show.ejs",{list} );
  
  
}));

//Create Route
app.post("/listings",
  wrapAsync(async (req,res,next)=>{
  
    const newListing= new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
     let {id}=req.params;
     const listing= await Listing.findById(id);
     res.render("listings/edit.ejs",{listing});
    
}));

//update route
app.put("/listings/:id",wrapAsync(async (req,res)=>{
     let{id}=req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);

  }
));

//Delete route

app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings"); 
}));


// app.get("/testlisting",async (req,res)=>{
//    let sampleListing =new Listing({
//             title:"my new villa",
//             description:"By the beach",
//             price:1200,
//             location:"Calanguate,Goa",
//             country:"India",
//     });

// await sampleListing.save(); 
// console.log("sample was saved");
// res.send("successful testing");

// });
app.all("*",(req,res,next)=>{
  next(new ExpressError(404, "page not found"));
});



 //error handling Middle ware
 app.use((err,req,res,next)=>{
  //console.log(err);
  let {statusCode=500,msg="something went wrong"} = err;
  res.status(statusCode).send(msg);
 });

app.listen(8080,()=>{
    console.log("app is listing on port 8080");
});

