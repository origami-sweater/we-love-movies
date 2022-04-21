const knex = require("../db/connection");

function list(){
    return knex("movies").select("*");
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
    readMovie,
    readTheaters,
}