const mongoose = require("mongoose");

const dishesSchema = mongoose.Schema({
    //_id: mongoose.Types.ObjectId(),
    // _id:mongoose.Types.ObjectId(),
    name:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})

const restaurantsSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    yearOpen: Number,
    category:{
        type: String,
        required: true
    },
    dishes: [dishesSchema]
});

mongoose.model(process.env.DB_RESTAURANTS_MODEL, restaurantsSchema,process.env.DB_RESTAURANTS_COLLECTION);
