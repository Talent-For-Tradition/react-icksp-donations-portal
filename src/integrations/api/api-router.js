const router = require("express").Router();
const { payRouter } = require("./payments");

router.use("/", payRouter);

module.exports = router;