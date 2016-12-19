
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
        twitter_id : {type : String, unique : true, required : true, index :true},
        name : String,
        pin_count: { type: Number, default: 0 },
        time_stamp: { type: Date, default: Date.now }
    },
    { collection: 'user' }
    );

UserSchema.methods.get_absolute_url = function(){
	return "/user/" + this.twitter_id + "/";
};
    
var User = module.exports = mongoose.model('User', UserSchema);

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: "BW4IJIIoXLB59On0tRr8EOETq",
    consumerSecret: "9T27nSEGdywRowNhooNiQiAPh4qln7yWeQt8l6IQXPXrEBs29m",
    callbackURL: "https://techintrest15.herokuapp.com/user/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
     //check user table for anyone with a twitter ID of profile.id
        User.findOne({ 'twitter_id': profile.id }, function(err, user) {
            if (err) return done(err);
            //No user was found... so create a new user with values from twitter (all the profile. stuff)
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    twitter_id : profile.id
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                //found user. Return
                return done(err, user);
            }
        });
    }
 ));

passport.serializeUser(function(user, done) {
  done(null, user.twitter_id);
});

passport.deserializeUser(function(twitter_id, done) {
  User.findOne({twitter_id : twitter_id}, function(err, user) {
    done(err, user);
  });
});