import { Link } from "react-router-dom";
import "./success.css"

const Success = () => {
  return (
    <div>
      <h1>Thank you for your purchase!</h1>
      <Link to="/" className="btn">
        Return to dashboard
      </Link>
    </div>
  );
};

export default Success;
