var express = require('express');
var router = express.Router();
var Pin = require('../models/pin');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/api/pin/all/', function(req, res) {
	Pin.find({}, (err, pin_list)=> {
		res.json({pins:pin_list});
		return;
	})
});

router.post('/api/pin/add/', (req,res) => {
	if(req.user){
		let new_pin = req.body;
		new_pin['creator'] = req.user;

		Pin(new_pin).save((err, pin) => {
			if(err){
				res.json({success:false, data:err});
			} else {
				res.json({success:true, data: pin});
			}
		})
	} else {
		res.json({success: false, data: 'User not logged in!'})
	}
})

// Match all rest of the react routes
router.all('*', function(req, res) {
  res.render('index');
});

module.exports = router;
