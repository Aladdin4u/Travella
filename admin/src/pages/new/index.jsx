import axios from "axios";
import { useState } from "react";

import "./new.scss";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { REACT_APP_BASE_URL } from "../../utils/config";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState([])

  const handleChange = (e) => {
    setInfo(prev => ({...prev, [e.target.id] : e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")
    try {
      const uploadRes = await axios.post(`${REACT_APP_BASE_URL}`, data)
      const { url } = uploadRes.data;
      const newUser = {
        ...info, img: url
      }
      await axios.post(`${REACT_APP_BASE_URL}/auth/register`, newUser)
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
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
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
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
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
              <button onSubmit={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
