import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Usersvg, Password } from "../assets/svgs.jsx";
import { Info, Warn, Error } from "../Functions/Toastify.jsx";
import "../Styles/pages.css";

const LogIn = () => {
  const [User, setUser] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };
  const sendDataToBackend = async (e) => {
    e.preventDefault();
    if (!User.username || !User.password) {
      Warn("All fields are required!");
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/finduser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(User),
          }
        );
        const result = await response.json();
        if (response.ok) {
          window.location.href = "/Home";
        } else {
          Error(result.Message);
        }
      } catch (error) {
        console.error("Error:", error);
        Error("Something Went Wrong.");
      }
    }
  };
  useEffect(() => {
    Info("Login into your account.");
  }, []);
  return (
    <>
      <ToastContainer />
      <div
        id="BODY"
        className="h-[100vh] w-full flex flex-col justify-center items-center bg-cover bg-center bg-[url('/images/photo1.png')]"
      >
        <form
          onSubmit={sendDataToBackend}
          action=""
          className="flex flex-col justify-center items-center"
        >
          <h1 to="/Login" className="text-2xl font-semibold text-white ">
            LogIn
          </h1>

          <div
            id="INPUTS"
            className="rounded-2xl h-[35vh] w-[24vw] cursor-pointer flex justify-center items-center flex-col gap-5"
          >
            <div className="input">
              <Usersvg />
              <input
                onChange={handleChange}
                type="text"
                name="username"
                placeholder="username"
                value={User.username}
              />
            </div>
            <div className="input">
              <Password />
              <input
                onChange={handleChange}
                onMouseOut={(e) => (e.target.type = "password")}
                onMouseOver={(e) => (e.target.type = "text")}
                name="password"
                placeholder="password"
                value={User.password}
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>

        <Link to="" className="text-white opacity-50 font-semibold">
          Forgot Password ?
        </Link>
        <br />
        <h2 className="text-white opacity-50">
          Don&apos;t have an account?
          <a href="/Signup" className="underline font-semibold cursor-pointer">
            {" "}
            SignUp
          </a>
        </h2>
      </div>
    </>
  );
};

export default LogIn;
