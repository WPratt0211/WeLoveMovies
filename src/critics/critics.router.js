const router = require("express").Router();
const controller = require("./critics.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:critic_id").get(controller.read).all(methodNotAllowed);

module.exports = router;