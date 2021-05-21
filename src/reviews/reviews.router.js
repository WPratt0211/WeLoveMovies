const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:review_id").get(controller.read).delete(controller.delete).put(controller.update).all(methodNotAllowed);

module.exports = router;