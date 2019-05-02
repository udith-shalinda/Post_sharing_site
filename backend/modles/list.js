const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    title:{type:String,require:true},
    comment:{type:String,require:true},
    imagePath:{type:String,require:true},
    creater:{type:mongoose.Schema.Types.ObjectId , ref:"User" , require:true}
});

module.exports = mongoose.model('List',listSchema);