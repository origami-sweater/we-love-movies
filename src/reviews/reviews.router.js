const router = require("express").Router();
const controller = require("./reviews.controller");

router
    .route("/:reviewId")
    .get(controller.readReview)
    .put(controller.update)
    .delete(controller.delete)

router
    .route("/")

module.exports = router;