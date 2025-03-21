import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { Usersvg, Email, Password, Camera } from "../assets/svgs.jsx";
import { Success, Error, Warn } from "../Functions/Toastify.jsx";
import "../Styles/pages.css";

const Signup = () => {
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  const handleChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };
  const imageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      setUser({ ...User, avatar: base64String });
    };
  };
  const sendDataToBackend = async (e) => {
    e.preventDefault();
    if (!User.username || !User.email || !User.password) {
      Warn("All fields are required!");
    } else {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(User),
          }
        );
        const result = await response.json();
        if (response.ok) {
          Success(result.Message);
          setTimeout(() => {
            window.location.href = "/Login";
          }, 2100);
        } else {
          Error(result.Message);
        }
      } catch (error) {
        console.error("Error:", error);
        Error("Something Went Wrong.");
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div
        id="BODY"
        className="h-[100vh] w-full flex justify-center items-center bg-cover bg-center bg-[url('/images/photo1.png')]"
      >
        <form
          onSubmit={sendDataToBackend}
          action=""
          className="-mt-28 sm:max-2xl:h-4/6 sm: max-2xl:w-3/6 h-[60vh] w-[24vw] flex justify-center items-center flex-col cursor-pointer"
        >
          <div
            id="CIRCLE"
            className=" sm:max-2xl:h-28 sm:max-2xl:w-28 h-[14vh] w-[7vw] flex justify-center items-center rounded-full bg-[#0e1c34a5] cursor-pointer"
          >
            <img
              id="PROFILE"
              src={User.avatar === "" ? "/images/profile.png" : User.avatar}
              alt="profile"
              className="sm:max-2xl:h-24 sm:max-2xl:w-24 h-[12vh] w-[6vw] rounded-full"
            />

            <span
              id="CAMERA_SVG"
              className="mt-16 ml-24 flex justify-center items-center h-8 w-8 rounded-full absolute bg-[#0a1323e4]"
            >
              <label htmlFor="IMAGEUPLOAD" className="cursor-pointer">
                <Camera />
              </label>
              <input
                id="IMAGEUPLOAD"
                type="file"
                accept="image/*"
                onChange={imageUpload}
                className="hidden"
              />
            </span>
          </div>

          <div className="flex justify-center items-center gap-28">
            <span className="font-semibold text-white">SignUp</span>
            <a href="/Login" className="font-semibold text-white opacity-50">
              LogIn
            </a>
          </div>

          <div
            id="INPUTS"
            className="rounded-2xl h-[40vh] w-[24vw] cursor-pointer flex justify-center items-center flex-col gap-5"
          >
            <div className="input">
              <Usersvg />
              <input
                onChange={handleChange}
                value={User.username}
                type="text"
                name="username"
                placeholder="username"
              />
            </div>
            <div className="input">
              <Email />
              <input
                onChange={handleChange}
                value={User.email}
                type="email"
                name="email"
                placeholder="email"
              />
            </div>
            <div className="input">
              <Password />
              <input
                onChange={handleChange}
                value={User.password}
                onMouseOut={(e) => (e.target.type = "password")}
                onMouseOver={(e) => (e.target.type = "text")}
                name="password"
                placeholder="password"
              />
            </div>
            <button type="submit" className="btn">
              SignUp
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
