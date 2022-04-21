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


//CRUD functions
async function list(req, res){
    const data = await moviesService.list();
    res.json({ data });
}

function readMovie(req, res){
    const { movie: data } = res.locals;
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    readMovie: [idExists, asyncErrorBoundary(readMovie)],
}