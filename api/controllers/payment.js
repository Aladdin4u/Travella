const User = require("../models/User");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

module.exports = {
  createCheckoutSession: async (req, res, next) => {
    const {hotelId} = (req.body);
    console.log(hotelId)
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "hotel jane test",
              },
              unit_amount: 1099,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_method_types: ["card"],
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
      });

      res.json({ url: session.url });
    } catch (error) {
      res.status(400).json({ error: { message: error.message } });
      next(error)
    }
  },
};
