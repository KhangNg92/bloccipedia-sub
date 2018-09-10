// #1
const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports = {
// #2
  createUser(newUser, callback){

// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
   
// #4

    return User.create({
        username: newUser.username,
      email: newUser.email,
      password: hashedPassword
      
    })
    .then((user) => {

      const msg = {
        to: newUser.email,
        from: 'donotreply@blocipedia.com',
        subject: 'Welcome to Blocipedia',
        text: 'Thank you for joining Blocipedia. To start contributing to the Wiki community please visit the site and login with the user information you provided. Looking forward to collaborating with you! - The Blocipedia Team',
        html: 'Thank you for Joining Blocipedia. To start contributing to the Wiki community please visit the site and login with the user information you provided.<br>Looking forward to collaborting with you!<br><br>-The Blocipedia Team',
        };
        sgMail.send(msg);
        callback(null, user);
      
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback) {
    User.findById(id)
    .then((user) => {
        callback(null, user);
    })
    .catch((err)=> {
        callback(err);
    })
}, 

updateUser(id, updatedRole, callback) {
    return User.findById(id)
    .then((user)=> { 
        return user.update({role: updatedRole},{fields: ['role']})
        .then(() => {
            callback(null, user)
        })
        .catch((err) => {
            callback(err);
        });
    });
}

}