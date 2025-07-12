const User = require("../models/user.js");

//RENDER SIGNUP FORM
module.exports.renderSignup = (req,res) => {
  res.render("users/signup.ejs");
};

//SIGNUP
module.exports.signUp = async (req,res) => {
  try{
    let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);

    //LOGIN AUTOMATICALLY AFTER SIGNUP
    req.login(registeredUser, (err) =>{
        if(err){
          return next(err);
        }
         req.flash("success","Welcome to WnaderLust");
         res.redirect("/listings");
    });
  }catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
  } 
};

module.exports.renderLogin = (req,res)=>{
  res.render("users/login.ejs");
};

//login
module.exports.logIn =  async(req,res) => {
    req.flash("success"," Welcome back to Wanderlust");
     let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logOut = (req,res,next) =>{
    req.logout((err) =>{
      if(err){
       return next(err);
      }
      req.flash("success","you are logged out!");
      res.redirect("/listings");
    })
};