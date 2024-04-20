import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./style/dark.scss";
import New from "./pages/new";
import List from "./pages/list";
import Home from "./pages/home";
import Login from "./pages/login";
import Single from "./pages/single";
import NewHotel from "./pages/newHotel";
import { userColumns } from "./datatablesource";
import { AuthContext } from "./context/AuthContext";
import { productInputs, userInputs } from "./formSource";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const protectedRouted = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/">
            <Route
              index
              element={
                <protectedRouted>
                  <Home />
                </protectedRouted>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <protectedRouted>
                    <List columns={userColumns} />
                  </protectedRouted>
                }
              />
              <Route
                path=":userId"
                element={
                  <protectedRouted>
                    <Single />
                  </protectedRouted>
                }
              />
              <Route
                path="new"
                element={
                  <protectedRouted>
                    <New inputs={userInputs} title="Add New User" />
                  </protectedRouted>
                }
              />
            </Route>
            <Route path="hotels">
              <Route index element={<List columns={hotelColumns} />} />
              <Route
                path=":productId"
                element={
                  <protectedRouted>
                    <Single />
                  </protectedRouted>
                }
              />
              <Route
                path="new"
                element={
                  <protectedRouted>
                    <NewHotel />
                  </protectedRouted>
                }
              />
            </Route>
            <Route path="rooms">
              <Route index element={<List columns={roomColumns} />} />
              <Route
                path=":productId"
                element={
                  <protectedRouted>
                    <Single />
                  </protectedRouted>
                }
              />
              <Route
                path="new"
                element={
                  <protectedRouted>
                    <NewRoom />
                  </protectedRouted>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
