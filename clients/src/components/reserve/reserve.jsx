import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFectch";
import "./reverve.css";

const Reverse = ({ setOpen, hotelId }) => {
    const navigate = useNavigate();
  const { dates } = useContext(SearchContext);
  const [selectedRooms, setSelectedRooms] = useState();
  const { data, loading, error, reFetch } = useFetch(`/hotels/room/${hotelId}`);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(startDate.getTime());

    let list = [];
    while (data <= end) {
      list.push(new Date(date).getTime());
      date.setDate(date.getTime() + 1);
    }
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const isAvaliable = (roomNumber) => {
    const isFound = roomNumber.unavaliableDate.some((date) =>
      alldates.includes(new Date(date.getTime()))
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

  const handleClick = async() => {
    try {
        await Promise.all(selectedRooms.map(roomId => {
            const res = axios.put(`/rooms/availability/${roomId}`, {dates:alldates})
            return res.data;
        }))
        setOpen(false)
        navigate("/")
    } catch (error) {
        
    }
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
          <div className="rItemInfo">
            <div className="rTitle">{item.title}</div>
            <div className="rDesc">{item.Desc}</div>
            <div className="rMax">{item.Max}</div>
            <div className="riTitle">
              Max people: <b>{item.title}</b>
            </div>
            <div className="rprice">{item.price}</div>
            <div className="rSelectedRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label htmlFor="">{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disable={!isAvaliable}
                  />
                </div>
              ))}
            </div>
            <button onClick={handleClick} className="rButton">
              Reserve Now
            </button>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Reverse;
