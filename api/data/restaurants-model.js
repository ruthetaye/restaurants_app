const mongoose = require("mongoose");

const dishesSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    location: {
        coordinates: {
            type: [Number], 
            index: "2dsphere"
        }
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
