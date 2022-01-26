const express = require("express");
const router = express.Router();
const restaurantsController = require("../controllers/restaurantsController");
const dishesController = require("../controllers/dishesController");

router.route("/restaurants")
    .get(restaurantsController.getAll)
    .post(restaurantsController.addOne);
router.route("/restaurants/:restaurantId")
    .get(restaurantsController.getOne)
    .put(restaurantsController.fullUpdateOne)
    .patch(restaurantsController.partialUpdateOne)
    .delete(restaurantsController.deleteOne);
router.route("/restaurants/:restaurantId/dishes")
    .get(dishesController.getAll)
    .post(dishesController.addOne);
router.route("/restaurants/:restaurantId/dishes/:dishId")
    .get(dishesController.getOne)
    .put(dishesController.fullUpdateOne)
    .patch(dishesController.partialUpdateOne)
    .delete(dishesController.deleteOne);

module.exports = router;