const knex = require("../db/connection");

function list(){
    return knex("movies").select("*");
}

function listMoviesShowing(){
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .distinct("m.*")
        .where({"mt.is_showing": true})
}

function readMovie(movie_id){
    return knex("movies")
        .where({"movie_id": movie_id})
        .first();
}

function readTheaters(movie_id){
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*", "mt.*")
        .where({"mt.movie_id": movie_id})
}

module.exports = {
    list,
    listMoviesShowing,
    readMovie,
    readTheaters,
}