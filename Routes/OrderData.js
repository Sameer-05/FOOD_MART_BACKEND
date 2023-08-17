const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
  try {
    const data = req.body.order_data;
    data.unshift({ Order_date: req.body.order_date });

    console.log('Received order data:', data);

    let eId = await Order.findOne({ email: req.body.email });
    console.log('Existing order for email:', eId);

    if (eId === null) {
      console.log('Creating new order...');
      await Order.create({
        email: req.body.email,
        order_data: [data]
      });
    } else {
      console.log('Updating existing order...');
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

module.exports = router;
