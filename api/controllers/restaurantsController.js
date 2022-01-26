const mongoose = require("mongoose");
const Restaurant = mongoose.model(process.env.DB_RESTAURANTS_MODEL);

const _runGeoQuery= function(req,res){
    const lng=parseFloat(req.query.lng);
    const lat=parseFloat(req.query.lat);
    let distance = parseFloat(process.env.GEO_SEARCH_MAX_DIST,10);

    if(req.query.dist){
        if(isNaN(req.query.dist)){
            res.status(400).json({"message":"distance must be a number"});
            return;
        }
        distance=req.query.dist;
    }
    console.log(lng);
    console.log("lat",lat);
    const point = {
        type:"Point",
        coordinates: [lng,lat]
    };

   
    const query = {
        "location":{
            "coordinates":{
                $near: {
                    $geometry: point,
                    $maxDistance: distance,
                    $minDistance: parseFloat(process.env.GEO_SEARCH_MIN_DIST,10)
                }
            }
        }
    };
    console.log(query);
    Restaurant.find(query).exec(function(err,restaurants){
        const response = {
            status:200,
            message:restaurants
        }
        if(err){
            response.status=500
            response.message=err;
            console.log(err);
        }
        else{
            response.status=200
            response.message=restaurants;
            console.log("Found Restaurants!!!");
        }
        res.status(response.status).json(response.message);
    });
}

const _updateOne = function(req,res,updateRestaurantCallback){
    console.log("update one restaurant controller invoked");
    const restaurantId = req.params.restaurantId;

    if(!mongoose.isValidObjectId(restaurantId)){
        console.log("request param restaurantId is not a valid ID");
        res.status(400).json({"message": "RestaurantId must be a valid ID"});
        return;
    };

    Restaurant.findById(restaurantId).exec(function(err,restaurant){
        const response={
            status:200,
            message: restaurant
        }
        if(err){
            console.log("Error finding restaurant");
            response.status=500;
            response.message=err;
        }else if(!restaurant){
            console.log("Restaurant id not found");
            response.status=404;
            response.message={"message": "Restaurant ID not found"};
        } 
        if(response.status !==200){
            res.status(response.status).json(response.message);
        } else{
            updateRestaurantCallback(req,res,restaurant,response);
        }
    });
}

const _saveUpdateOne = function(res,restaurant,response){
    restaurant.save(function(err,updatedRestaurant){
        if(err){
            response.status=500;
            response.message=err;
            console.log("in err of save");
        } 
            console.log(response.message);
            res.status(response.status).json(response.message);
    });
}

const _fullRestaurantUpdate = function(req,res,restaurant,response){
    restaurant.name=req.body.name;
    restaurant.yearOpen= req.body.yearOpen;
    restaurant.category= req.body.category;
    _saveUpdateOne(res,restaurant,response);
}

const _partialRestaurantUpdate = function(req,res,restaurant,response){
    console.log("here");
    if (req.body.name){
        restaurant.name=req.body.name;
    }
    if(req.body.yearOpen){
        restaurant.yearOpen= req.body.yearOpen;
    }
    _saveUpdateOne(res,restaurant,response);
}

const getAll = function(req,res){
    console.log("getAll invoked");

    if(req.query && req.query.lat && req.query.lng){
        if(isNaN(req.query.lat)|| isNaN(req.query.lng)){
            res.status(400).json({"message":"lat and lng are not numbers"});
            return;
        }
        _runGeoQuery(req,res);
        return;
    }

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
        dishes:[]
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
    console.log("full update one restaurant invoked");
    _updateOne(req,res,_fullRestaurantUpdate);     
}

const partialUpdateOne = function(req,res){
    console.log("partial update one restaurant invoked");
    _updateOne(req,res,_partialRestaurantUpdate);
}

module.exports={
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdateOne,
    partialUpdateOne
}
