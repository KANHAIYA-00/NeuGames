import { ToastContainer } from "react-toastify";
import { Logout } from "../assets/svgs";

const LogOutbtn = () => {
  const LogOut = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = "/Login";
      } else {
        Error("Something Went Wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      Error("Something Went Wrong.");
    }
  };
  return (
    <div>
      <ToastContainer />
      <div
        className="h-[45px] w-[45px] rounded-full p-1 flex justify-center items-center cursor-pointer"
        style={{ boxShadow: "3px 3px 6px #000000, -2px -2px 6px #484848fb" }}
      >
        <div
          id="LOGIN"
          className="h-full w-full rounded-full flex justify-center items-center transition-all duration-300 cursor-pointer"
          onClick={() => LogOut()}
        >
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default LogOutbtn;
