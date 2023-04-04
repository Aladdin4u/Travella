
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useEffect } from "react";

const Reverse = ({ setOpen, hotelId }) => {
  const stripePromise = loadStripe(
    "pk_test_51MsyNdB3KrsTgH4dxD0TcUPW7aRI3LiqBzhHsUn6FP006wMVcWDToanngoRLizmynPDxpxbW9ad2V7NdaSlERIAY00VzSVUQ6O"
  );
useEffect (() => {
    loadStripePage()
},[])
  const loadStripePage = async () => {
    setLoading(true);
    try {
      const client_secret = axios.post(
        `http://localhost:8000/api/checkout/create-checkout-session`
      );
      const options = {
        // passing the client secret obtained in step 3
        clientSecret: client_secret,
        // Fully customizable with appearance API.
        appearance: {
          /*...*/
        },
      };
    } catch (error) {}
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <form>
          <PaymentElement />
          <button>Submit</button>
        </form>
      </Elements>
    </div>
  );
};

export default Reverse;
