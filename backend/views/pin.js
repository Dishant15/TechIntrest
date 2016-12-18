var express = require('express');
var router = express.Router();
var Pin = require('../models/pin');

router.get('/', function(req, res) {
  res.render('index');
});

router.post('/api/pin/add/', (req,res) => {
	if(req.user){
		// let new_pin = {
		// 	image: "https://lh4.ggpht.com/wKrDLLmmxjfRG2-E-k5L5BUuHWpCOe4lWRF7oVs1Gzdn5e5yvr8fj-ORTlBF43U47yI=w300",
		// 	description: "this is first test image",
		// 	creator: req.user.twitter_id,
		// }
		// Pin(new_pin).save((err, pin) => {
		// 	if(err){
		// 		res.json({success:false});
		// 	} else {
		// 		console.log(pin)
		// 		res.json({success:true});
		// 	}
		// })
		res.json({success:true, data: req.body})
	} else {
		res.json({success: false, data: 'User not logged in!'})
	}
})

// Match all rest of the react routes
router.all('*', function(req, res) {
  res.render('index');
});

module.exports = router;
