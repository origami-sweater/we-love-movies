const knex = require("../db/connection");

function list(){
    return knex("movies").select("*");
}

function readMovie(movie_id){
    return knex("movies")
        .where({"movie_id": movie_id})
        .first();
}

module.exports = {
    list,
    readMovie,
}