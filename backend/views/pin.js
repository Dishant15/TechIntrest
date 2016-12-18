var express = require('express');
var router = express.Router();
var Pin = require('../models/pin');
var User = require('../models/user');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/api/pin/all/', function(req, res) {
	Pin.find({}, (err, pin_list)=> {
		if(err) throw err;
		res.json(pin_list);
	})
});

router.get('/api/pin/:id', (req,res)=> {
	Pin.findOne({_id: req.params.id}, (err, pin)=> {
		if(err) throw err;
		res.json(pin);
	})
})

router.get('/api/pin/:id/delete/', (req, res)=>{
	Pin.find({ _id:req.params.id }).remove( (err) => {
		if(err) throw err;
		res.json({success:true})
	} );
})

router.get('/api/user/:id/', (req, res)=>{
	Pin.find({ 'creator.twitter_id':req.params.id }, (err, pin_list)=> {
		if(err) throw err;
		res.json(pin_list);
	})
})


router.post('/api/pin/add/', (req,res) => {
	if(req.user){
		let new_pin = req.body;
		new_pin['creator'] = req.user;

		// Update user pin count
		User.findByIdAndUpdate(req.user._id, { $inc: { key: 'pin_count' }}, function(err, data){
	    	if(err) throw err;
	    });

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
