const mongoose = require("mongoose");
const Restaurant = mongoose.model(process.env.DB_RESTAURANTS_MODEL);

const getAll = function(req,res){
    console.log("getAll invoked");

    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
    let count = parseInt(process.env.DEFAULT_FIND_LIMIT);
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT);

    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count=parseInt(req.query.count,10);
    }

    if (isNaN(offset)||isNaN(count)){
        console.log("offset or count are not numbers");
        res.status(400).json({"message":"QueryString offset and count should be digits."});
        return;
    }
    if(count>maxCount){
        res.status(400).json({"message":"Cannot exceed count of "+maxCount});
        return;
    }

    Restaurant.find().skip(offset).limit(count).exec(function(err,restaurants){
        if(err){
            console.log("Error finding restaurants");
            res.status(500).json(err)
        } else{
            console.log("Found restaurants");
            res.status(200).json(restaurants);
        }
    });
}
const getOne = function(req,res){
    console.log("controller getOne invoked");
    const restaurantId = req.params.restaurantId

    if(!mongoose.isValidObjectId(restaurantId)){
        console.log("request param not valid restaurant ID");
        res.status(400).json({"message":"RestaurantID must be valid"});
        return;
    }
    Restaurant.findById(restaurantId).exec(function(err,restaurant){
        const response = {
            status: 200,
            message: restaurant
        }
        if(err){
            console.log("Error finding restaurant");
            response.message=err;
            response.status=500;
        }else if(!restaurant){
            console.log("Restaurant ID not found");
            response.status=404;
            response.message={"message":"Restaurant ID not found"};
        }
        res.status(response.status).json(response.message);
    })
};
const addOne = function(req,res){
    console.log("controller addOne invoked");

    const newRestaurant = {
        name:req.body.name,
        yearOpen:req.body.yearOpen,
        category:req.body.category,
        dishes:[],
    }
    Restaurant.create(newRestaurant,function(err,restaurant){
        const response ={
            status:201,
            message:restaurant
        }
        if(err){
            console.log("Error adding restaurant");
            response.status=500;
            response.message=err
        }
        res.status(response.status).json(response.message);
    });
};
const deleteOne = function(req,res){
    console.log("controller deleteOne invoked");

    const restaurantId = req.params.restaurantId;
    Restaurant.findByIdAndDelete(restaurantId).exec(function(err,deletedRestaurant){
        const response ={
            status:201,
            message:{"message":"deleted restaurant with ID "+restaurantId}
        }
        if(err){
            console.log("Error finding restaurant");
            response.status=500;
            response.message=err;
        } else if(!deletedRestaurant){
            console.log("Restaurant ID not found");
            response.status=404;
            response.message={"message":"Restaurant ID not found"};
        }
        res.status(response.status).json(response.message);
    })
};
const fullUpdateOne = function(req,res){
    console.log("controller fullUpdateOne invoked");

    const restaurantId = req.params.restaurantId;
    if(!mongoose.isValidObjectId(restaurantId)){
        console.log("request param not valid restaurant ID");
        res.status(400).json({"message":"RestaurantID must be valid"});
        return ;
    }
    const updatedRestaurantInfo = {
        name:req.body.name,
        yearOpen:req.body.yearOpen,
        category:req.body.category
    }
   Restaurant.findByIdAndUpdate(restaurantId,updatedRestaurantInfo,{
        returnOriginal:false
    }).exec(function(err,updatedRestaurant){
        const response = {
            status: 200,
            message: {"Updated Restaurant":updatedRestaurant}
        }
        if(err){
            console.log("error updating");
            response.status=500;
            response.message=err;
        } else if(!updatedRestaurant){
            console.log("restaurant ID not found"); 
            response.status=404;
            response.message={"message":"Restaurant ID not found"};
        }
        res.status(response.status).json(response.message);
    });
}

module.exports={
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdateOne
}
