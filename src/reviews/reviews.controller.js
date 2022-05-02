const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");

//Validator functions
async function idExists(req, res, next){
    const review = await reviewsService.readReview(req.params.reviewId);
    if(review){
        res.locals.review = review;
        return next();
    };
    next({status: 404, message: "Review cannot be found."});
}

//CRUD functions

//added readReview for troubleshooting
function readReview(req, res){
    const { review: data } = res.locals;
    res.json({ data });
}

async function update(req, res){
    const revId = res.locals.review.review_id;
    const updatedReview = {
        ...req.body.data,
        review_id: revId,
      };
    await reviewsService.update(updatedReview);
    const readUpdatedReview = await reviewsService.readUpdatedReview(revId);
    readUpdatedReview.forEach((review) => review.critic = review.critic[0]);
    const data = readUpdatedReview[0];
    res.json({ data });
}

async function destroy(req, res){
    const { review_id } = res.locals.review; 
    await reviewsService.destroy(review_id);
    res.sendStatus(204)
}

module.exports = {
    readReview: [asyncErrorBoundary(idExists), readReview],
    update: [asyncErrorBoundary(idExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(idExists), asyncErrorBoundary(destroy)]
}