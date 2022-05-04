const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:reviewId")
    .get(controller.readReview)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router
    .route("/")
    .all(methodNotAllowed);

module.exports = router;