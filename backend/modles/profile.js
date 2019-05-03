const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    name:{type:String,require:true},
    imagePath:{type:String,require:true},
    address:{type:String,require:true},
    email:{type:String,require:true},
    university:{type:String,require:true},
    mobile:{type:String,require:true},
    creater:{type:mongoose.Schema.Types.ObjectId , ref:"User" , require:true}
});

module.exports = mongoose.model('ProfileInfo',profileSchema);