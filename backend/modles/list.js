const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    profileImage:{type:String,require:true},
    username:{type:String,require:true},
    title:{type:String,require:true},
    comment:{type:String,require:true},
    imagePath:{type:String,require:true},
    creater:{type:mongoose.Schema.Types.ObjectId , ref:"User" , require:true}
});

module.exports = mongoose.model('List',listSchema);