const router = require("express").Router();

// GET Requests
router.use(require("./get/getTestimonials"));

// POST Requests
router.use(require("./post/addTestimonial"));

module.exports = router;