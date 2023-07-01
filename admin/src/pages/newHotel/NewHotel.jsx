import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("rooms")
  
  const handleChange = (e) => {
    setInfo(prev => ({...prev, [e.target.id] : e.target.value}))
  }

  const handleSelect  = () => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value)
    setRooms(value)
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        object.values(files).map(async(file) => {
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "upload")
        const uploadRes = await axios.post("https://api", data)
        const { url } = uploadRes.data;
        return url
      }))
      const newHotel = {
        ...info, rooms, photos: list
      }
      await axios.post("/hotels", newHotel)
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
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {hotelIput.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder}
                  id={input.id}
                  onChange={handleChange}
                />
                </div>
              ))}
              <div className="formInput">
                  <label>Featured</label>
                  <select id="features" onChange={handleChange}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
              </div>
              <div className="selectRooms">
                  <label>Rooms</label>
                  <select id="features" multiple onChange={handleSelect}>
                    {loading ? "Loading" : data && data.map(room => (
                      <option key={room._id} value={room._id}>{room.title}</option>
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

export default NewHotel;
