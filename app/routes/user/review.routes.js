const ReviewController = require("../../controllers/user/reviews.controller");
const authJwt = require("../../middleware/authJwt");

module.exports= app => {
    app.post("/api/review/data", [authJwt.verifyToken], ReviewController.addReview);
    app.get("/api/review/restaurant/:id", ReviewController.getReview);
}