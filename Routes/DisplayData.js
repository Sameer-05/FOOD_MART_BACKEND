const express = require("express");
const router = express.Router();
router.post('/foodData', (req, res) => {
  try {
    // console.log(global.FOOD_ITEM);
    res.send([global.FOOD_ITEM,global.food_category]);
  } catch (error) {
    console.error(error.message);
    res.send("server error")
  }
});
module.exports = router;
