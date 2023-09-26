const Router = require("koa-router");
import UserController from "../controller/user";
const router = new Router();

router.get("/user", UserController.listUsers);

module.exports = router;
