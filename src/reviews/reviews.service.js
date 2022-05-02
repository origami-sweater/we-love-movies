const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")

const addCritic = reduceProperties("critic_id", {
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null,"surname"],
    organization_name: ["critic", null,"organization_name"]
});

function readReview(review_id){
    return knex("reviews")
        .where({ review_id })
        .first();
}

function update(updatedReview){
    return knex("reviews")
        .where({ "review_id" : updatedReview.review_id })
        .update(updatedReview)
}

function readUpdatedReview(review_id){
    return knex("reviews as r")
        .join("critics as critic", "r.critic_id", "critic.critic_id")
        .select("r.*", "critic.*")
        .where({"r.review_id": review_id})
        .then(addCritic)
}

function destroy(review_id){
    return knex("reviews")
        .where({ review_id })
        .del();
}

module.exports = {
    readReview,
    update,
    readUpdatedReview,
    destroy,
}