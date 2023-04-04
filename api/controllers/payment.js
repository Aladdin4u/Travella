const User = require("../models/User");
const stripe = require('stripe')('sk_test_51MsyNdB3KrsTgH4dK29H5cTrc7SdANsAWkirXXjZPm4l7xNMPXvlM9FlWUICfwWnBLLcvDbOiLl2SYvEz9RqybQU00r2c7kAaU');

module.exports = {
  createCheckoutSession: async (req, res, next) => {
    const newUser = new User(req.body);
    // const paymentIntent = await stripe.paymentIntents.create({
    //     amount: 1099,
    //     currency: 'usd',
    //     automatic_payment_methods: {enabled: true},
    //   });
    try {
        const intent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'usd',
            automatic_payment_methods: {enabled: true},
          });
        res.json({client_secret: intent.client_secret});
    } catch (error) {
      next(error);
    }
  },
};
