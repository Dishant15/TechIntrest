var mongoose = require('mongoose');

var PinSchema = mongoose.Schema({
		image : String, // External image url
		description: String,
        creator : String,
        time_stamp: { type: Date, default: Date.now }
    },
    { collection: 'Pins' }
    );
    
var Pins = module.exports = mongoose.model('Pins', PinSchema);