const mongoose=require('mongoose')

const budgetSchema= new mongoose.Schema({
    title: {
        type:String,
        required:true,
        trim: true,
        unique: true,
        uppercase:true
    },
    budget:{
        type:Number,
        required:true,
        trim: true,
    },
    color:{
        type:String,
        required:true,
        trim: true,
        uppercase:true,
        minlength: 6
    }
},{collection: 'budgets'})

module.exports = mongoose.model('budgets',budgetSchema);