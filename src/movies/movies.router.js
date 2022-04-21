const router = require("express").Router();
const controller = require("./movies.controller");

//STILL NEEDS FROM MOVIES LIST: ?IS_SHOWING=TRUE 

router
    .route("/:movieId")
    .get(controller.readMovie)

router
    .route("/")
    .get(controller.list)

module.exports = router;