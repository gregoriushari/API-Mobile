const ReviewController = require("../../controllers/user/reviews.controller");

module.exports= app => {
    app.post("/api/review/data", ReviewController.addReview);
    app.get("/api/review/restaurant/:id", ReviewController.getReview);
}