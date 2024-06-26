import { useState } from "react";

import "./newRoom.scss";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { REACT_APP_BASE_URL } from "../../utils/config";

const NewRoom = () => {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(undefined)
  const [rooms, setRooms] = useState([])

  const { data, loading, error } = useFetch("/hotels")
  const handleChange = (e) => {
    setInfo(prev => ({...prev, [e.target.id] : e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map(room => ({ number : room})) 
    try {
      const newRoom = {
        ...info, roomNumbers
      }
      await axios.post(`${REACT_APP_BASE_URL}/room/${hotelId}`, newRoom);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {RoomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input 
                    type={input.type} 
                    placeholder={input.placeholder} 
                    id={input.id}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                  <label>Rooms</label>
                  <textarea onChange={e => setRooms(e.target.value)} placeholder="Give coma between room numbers" />
              </div>
              <div className="formInput">
                  <label>Choose a hotel</label>
                  <select id="hotelId" onChange={e => setHotelId(e.target.value)}>
                    {loading ? "Loading" : data && data.map(hotel => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                  </select>
                </div>
              <button onSubmit={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
