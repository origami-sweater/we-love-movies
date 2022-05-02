const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moviesService = require("./movies.service");

//Validator functions
async function idExists(req, res, next){
    const movie = await moviesService.readMovie(req.params.movieId);
    if(movie){
        res.locals.movie = movie;
        return next();
    };
    next({status: 404, message: "Movie cannot be found."});
}

async function isShowingTrue(req, res, next){
    if(req.query.is_showing){
        const movies = await moviesService.listMoviesShowing();
        res.locals.movies = movies;
        return next();
    } else {
        const allMovies = await moviesService.list();
        res.locals.movies = allMovies;
        return next();
    };
}

async function theatersExist(req, res, next){
    const theaters = await moviesService.readTheaters(req.params.movieId);
    if(theaters){
        res.locals.theaters = theaters;
        return next();
    };
    next({status: 404, message: "No showings can be found."});
}

async function reviewsExist(req, res, next){
    const reviews = await moviesService.readReviews(req.params.movieId);
    if(reviews){
        reviews.forEach((review) => {
            review.critic = review.critic[0]
        })
        res.locals.reviews = reviews;
        return next();
    };
    next({status: 404, message: "No reviews can be found."});
}


//CRUD functions
function list(req, res){
    const data = res.locals.movies;
    res.json({ data });
}

function readMovie(req, res){
    const { movie: data } = res.locals;
    res.json({ data });
}

function readTheaters(req, res){
    const { theaters: data } = res.locals;
    res.json({ data });
}

function readReviews(req, res){
    const data = res.locals.reviews;
    res.json({ data });
}

module.exports = {
    list: [asyncErrorBoundary(isShowingTrue), list],
    readMovie: [asyncErrorBoundary(idExists), readMovie],
    readTheaters: [asyncErrorBoundary(theatersExist), readTheaters],
    readReviews: [asyncErrorBoundary(reviewsExist), readReviews]
}