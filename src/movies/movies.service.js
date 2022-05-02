const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")

const addCritic = reduceProperties("critic_id", {
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null,"surname"],
    organization_name: ["critic", null,"organization_name"]
});

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

function readReviews(movie_id){
    return knex("reviews as r")
        .join("critics as critic", "r.critic_id", "critic.critic_id")
        .select("r.*", "critic.*")
        .where({"r.movie_id": movie_id})
        .then(addCritic)
}

module.exports = {
    list,
    listMoviesShowing,
    readMovie,
    readTheaters,
    readReviews,
}