import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { REACT_APP_BASE_URL } from "../../utils/config";
import { SearchContext } from "../../context/SearchContext";

const Reverse = ({ setOpen, hotelId }) => {
  const navigate = useNavigate();
  const { dates } = useContext(SearchContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = useFetch(
    `${REACT_APP_BASE_URL}/hotels/room/${hotelId}`
  );

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];
    while (date <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getTime() + 1);
    }
    return list;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvaliable = (roomNumber) => {
    const isFound = roomNumber.unavaliableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  
  const handleClick = async () => {
    setLoading(true);
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `${
              import.meta.env.REACT_APP_BASE_URL
            }/rooms/availability/${roomId}`,
            {
              dates: alldates,
            }
          );
          return res.data;
        })
      );
      // const paymentIntent = await axios.post(
      //   `http://localhost:8000/api/checkout/create-checkout-session`,
      //   { hotelId, price }
      // );
      // console.log(paymentIntent);
      setOpen(false);
      navigate("/");
      // setLoading(false);
      // window.location.assign = paymentIntent.url;
    } catch (error) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => {
          return (
            <div className="rItem" key={item._id}>
              <div className="rInfo">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax">
                  Max People: <b>{item.maxPeople}</b>
                </div>
                <div className="rprice">Price: {item.price}</div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber.number}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvaliable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reverse;
