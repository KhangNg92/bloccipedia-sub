const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
    signUp(req, res, next){
      res.render("users/sign_up");
    },

    create(req, res, next){
        //#1
        console.log("create a user");
        console.log(JSON.stringify(req.body));
             let newUser = {
        username: req.body.username,
       email: req.body.email,
       password: req.body.password,
      passwordConfirmation: req.body.password_conf
             };
        // #2
        console.log(JSON.stringify(newUser));
             userQueries.createUser(newUser, (err, user) => {
               if(err){
                 req.flash("error", err);
                 res.redirect("/users/sign_up");
               } else {
        
        // #3
                 passport.authenticate("local")(req, res, () => {
                   req.flash("notice", "You've successfully signed in!");
                   res.redirect("/");
                 })
               }
             });
           },

           signInForm(req, res, next){
            res.render("users/sign_in");
          },


          signIn(req, res, next){
            passport.authenticate("local")(req, res, function () {
              if(!req.user){
                req.flash("notice", "Sign in failed. Please try again.")
                res.redirect("/users/sign_in");
              } else {
                req.flash("notice", "You've successfully signed in!");
                res.redirect("/");
              }
            })
          },

          signOut(req, res, next){
            req.logout();
            req.flash("notice", "You've successfully signed out!");
            res.redirect("/");
          },

          updatePremium(req, res, next) {
            userQueries.updateUser(req.params.id, 1, (err, user) => {
                if(err || user == null) {
                    console.log(err);
                    res.redirect(404, `/users/${req.params.id}`)
                } else {
                    res.redirect(`/users/${req.params.id}`)
                }
            });
        }, 
    
        updateStandard(req, res, next) {
            userQueries.updateUser(req.params.id, 0, (err, user) => {
                if(err || user == null) {
                    console.log(err);
                    res.redirect(404, `/users/${req.params.id}`)
                } else {
                    console.log(user);
                    res.redirect(`/users/${req.params.id}`)
                }
            });
        }, 
  }