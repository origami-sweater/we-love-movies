const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const addMovies = reduceProperties("theater_id", {
    title: ["movies", null, "title"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
});

function list(){
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id" )
        .select(
            "t.address_line_1",
            "t.address_line_2",
            "t.city",
            "t.name",
            "t.state",
            "t.zip",
            "m.title",
            "m.runtime_in_minutes",
            "m.rating",
            "m.description"
            )
        .then(addMovies)
}

module.exports = {
    list,
};