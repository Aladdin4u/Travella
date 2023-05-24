const Hotel = require("../models/Hotel");
const stripe = require("stripe")(
  "sk_test_51MsyNdB3KrsTgH4dK29H5cTrc7SdANsAWkirXXjZPm4l7xNMPXvlM9FlWUICfwWnBLLcvDbOiLl2SYvEz9RqybQU00r2c7kAaU"
);

module.exports = {
  createCheckoutSession: async (req, res, next) => {
    const { hotelId, price } = req.body;
    try {
      const hotel = await Hotel.findById({ hotelId });
      try {
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: hotel.name,
                },
                unit_amount: price,
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
        next(error);
      }
    } catch (error) {
      res.status(400).json({ error: { message: error.message } });
      next(error);
    }
  },
  bookRoom: async (req, res, next) => {
    const { hotelId, price } = req.body;
    try {
      const hotel = await Hotel.findById({ hotelId });
    } catch (error) {
      res.status(400).json({ error: { message: error.message } });
      next(error);
    }
  },
};
