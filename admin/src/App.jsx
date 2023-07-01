import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { userColumns } from "./datatablesource";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const protectedRouted = ({ children }) => {
    const { user } = useContext(AuthContext)
    if(!user) {
      return <Navigate to="/login" />;
    }

    return children;
  }

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
              </protectedRouted>} 
            />
            <Route path="users">
              <Route index element={
              <protectedRouted>
                <List columns={userColumns} />
              </protectedRouted>} 
            />
            <Route path=":userId" element={
              <protectedRouted>
                <Single />
              </protectedRouted>} 
            />
              <Route
                path="new"
                element={
                  <protectedRouted>
                  <New inputs={userInputs} title="Add New User" />
                </protectedRouted>}
              />
            </Route>
            <Route path="hotels">
              <Route index element={<List columns={hotelColumns} />} />
              <Route path=":productId" element={
              <protectedRouted>
                <Single />
              </protectedRouted>} 
              />
              <Route
                path="new"
                element={
                <protectedRouted>
                  <New inputs={productInputs} title="Add New Product" />
                </protectedRouted>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
