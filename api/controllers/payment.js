const Hotel = require("../models/Hotel");
const stripe = require("stripe")(
  "sk_test_51MsyNdB3KrsTgH4dK29H5cTrc7SdANsAWkirXXjZPm4l7xNMPXvlM9FlWUICfwWnBLLcvDbOiLl2SYvEz9RqybQU00r2c7kAaU"
);

// [
//   {
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: hotel.name,
//       },
//       unit_amount: hotel.price,
//     },
//     quantity: 1,
//   },
// ]
module.exports = {
  createCheckoutSession: async (req, res, next) => {
    const { hotelId } = req.body;
    const lineItem = [];

    hotelId.forEach((element) => {
      lineItem.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: element.title,
          },
          unit_amount: element.price,
        },
        quantity: 1,
      });
    });
    console.log(hotelId);
    try {
      // const hotel = await Hotel.findById({ hotelId });
      const session = await stripe.checkout.sessions.create({
        line_items: lineItem,
        mode: "payment",
        payment_method_types: ["card"],
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
      });

      res.json({ url: session.url });
    } catch (error) {
      res.status(400).json({ error: { message: error.message } });
      next(error);
    }
  },
};
