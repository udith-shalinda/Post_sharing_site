const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    title:{type:String,require:true},
    comment:{type:String,require:true}
});

module.exports = mongoose.model('List',listSchema);