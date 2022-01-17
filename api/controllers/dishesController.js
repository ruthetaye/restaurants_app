const mongoose = require("mongoose");
const Restaurant = mongoose.model(process.env.DB_RESTAURANTS_MODEL);

const _addDish = function(req,res,restaurant){
    const newDish = {
        name:req.body.name,
        price:parseFloat(req.body.price)
    }
    console.log("name", req.body.name);
    console.log("price", parseFloat(req.body.price));
    restaurant.dishes.push(newDish);

    restaurant.save(function(err,addedDish){
        const response = {
            status: 200,
            message: []
        }
        if(err){
            response.status= 500;
            response.message= err;
        }else{
            response.status= 201;
            response.message= {"added dish": newDish};
        }
        res.status(response.status).json(response.message);
    });
}

const _updateDish = function(req,res,restaurant){
    const dishId = req.params.dishId;
 
    restaurant.dishes.id(dishId).name = req.body.name;
    restaurant.dishes.id(dishId).price= req.body.price;
    restaurant.save(function(err,updatedDish){
        const response = {
            status: 200,
            message: []
        }
        if(err){
            response.status= 500;
            response.message= err;
        }else{
            response.status= 201;
            response.message= {"updated dish with id":dishId};
        }
        res.status(response.status).json(response.message);
    });
        
}

const _deleteDish = function(req,res,restaurant){
    const dishId = req.params.dishId;
    console.log("dishId", dishId);

    if(!mongoose.isValidObjectId(dishId)){
        console.log("request param not valid dish ID");
        res.status(400).json({"message":"DishID must be valid"});
        return;
    }
    restaurant.dishes.pull(dishId);

    restaurant.save(function(err,deletedDish){
        const response = {
            status: 200,
            message: []
        }
        if(err){
            response.status= 500;
            response.message= err;
        }else{
            response.status= 201;
            response.message= {"deleted dish with id":dishId};
        }
        res.status(response.status).json(response.message);
    });
}

const getAll = function(req,res){
    console.log("getAll dishes Controller invoked");

    const restaurantId = req.params.restaurantId;
    if(!mongoose.isValidObjectId(restaurantId)){
        console.log("request param not valid restaurant ID");
        res.status(400).json({"message":"RestaurantID must be valid"});
        return;
    }
    Restaurant.findById(restaurantId).select("dishes").exec(function(err,restaurant){
        const response = {
            status: 200,
            message: restaurant.dishes
        }
        if(err){
            console.log("Error finding dishes");
            response.status=500;
            response.message=err;
        }else if(!restaurant){
            console.log("Restaurant ID not found");
            response.status=404;
            response.message={"message":"Restaurant ID not found"};
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function(req,res){
    console.log("getOne dishes controller invoked");
    const restaurantId = req.params.restaurantId;
    const dishId = req.params.dishId;
    
    if(!mongoose.isValidObjectId(restaurantId)){
        console.log("request param not valid restaurant ID");
        res.status(400).json({"message":"RestaurantID must be valid"});
        return;
    }
    if(!mongoose.isValidObjectId(dishId)){
        console.log("request param not valid dish ID");
        res.status(400).json({"message":"DishID must be valid"});
        return;
    }
    Restaurant.findById(restaurantId).select("dishes").exec(function(err,restaurant){
        const response = {
            status: 200,
            message: []
        }
        if(err){
            console.log("Error finding dish");
            response.status=500;
            response.message=err;
        } else if(!restaurant){
            console.log("restaurantID not found");
            response.status=404;
            response.message={"message":"dish ID not found"}
        }else if(restaurant){
            console.log("");
            response.message=restaurant.dishes.id(dishId)
        }
        
    res.status(response.status).json(response.message);
    });
}

const addOne=function(req,res){
    console.log("addOne dish controller invoked");
    const restaurantId = req.params.restaurantId;
    Restaurant.findById(restaurantId).select("dishes").exec(function(err, restaurant){
        console.log("Found restaurant",restaurant);
        const response={
            status:200,
            message:restaurant
        };
        if(err){
            console.log("Error finding restaurant");
            response.status=500;
            response.message=err;
        } else if(!restaurant){
            console.log("Error finding restaurant");
            response.status=404;
            response.message={"message":"Restaurant ID not found"+restaurantId};
        }
        if(restaurant){
            _addDish(req,res,restaurant);
        } else{
            res.status(response.status).json(response.message);
        } 
    });
}
const deleteOne=function(req,res){
    console.log("deleteOne dish controller invoked");
    const restaurantId = req.params.restaurantId;
    Restaurant.findById(restaurantId).select("dishes").exec(function(err, restaurant){
        console.log("Found restaurant",restaurant);
        const response={
            status:200,
            message:restaurant
        };
        if(err){
            console.log("Error finding restaurant");
            response.status=500;
            response.message=err;
        } else if(!restaurant){
            console.log("Error finding restaurant");
            response.status=404;
            response.message={"message":"Restaurant ID not found"+restaurantId};
        }
        if(restaurant){
            _deleteDish(req,res,restaurant);
        } else{
            res.status(response.status).json(response.message);
        } 
});
}

const fullUpdateOne = function(req,res){

    console.log("fullUpdateOne dish controller invoked");
    const restaurantId = req.params.restaurantId;

    Restaurant.findById(restaurantId).select("dishes").exec(function(err, restaurant){
        console.log("Found restaurant",restaurant);
        const response={
            status:200,
            message:restaurant
        };
        if(err){
            console.log("Error finding restaurant");
            response.status=500;
            response.message=err;
        } else if(!restaurant){
            console.log("Error finding restaurant");
            response.status=404;
            response.message={"message":"Restaurant ID not found"+restaurantId};
        }
        if(restaurant){
            _updateDish(req,res,restaurant);
        } else{
            res.status(response.status).json(response.message);
        } 
    });
}

module.exports ={
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdateOne
}
