var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
router.get('/twitter/login/', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/user/login' }), function(req, res){
	if(req.session.path){
		const red = req.session.path;
		req.session.path = null;
		res.json({success:true, date:'redirect', url:red});
	} else {
		res.redirect('/');
	}
});

router.get('/logout/', function(req, res){
  req.logout();
  res.json({success:true, data:'loggout successfull!'});
});

// pre twitter login view, to save a search path to session
router.get('/pre/:path', function(req, res){
	req.session.path = req.params.path.split("^").join("/");
	res.json('/user/twitter/login');
});

router.get('/login/', function(req, res){
	res.json({success:false, data:"Twitter Login failed!!"});
});

router.get('/all/', function(req, res){
	User.find({}, (err, users)=> {
		if(err) throw err;
		res.json(users);
	})
});

module.exports = router;
