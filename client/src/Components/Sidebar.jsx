import { useEffect, useState } from "react";
import { Home, Profile } from "../assets/svgs.jsx";
import LogInbtn from "./Loginbtn.jsx";
import LogOutbtn from "./Logoutbtn.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Authenticate from "../Functions/Authenticate.jsx";

const Sidebar = () => {
  const [select, setSelect] = useState("");
  const Navigate = useNavigate();
  const location = useLocation();
  const boxShadow = "inset 2px 2px 4px #000000, inset -1px -1px 4px #484848fb";

  useEffect(() => {
    if (location.pathname === "/Home") {
      setSelect("HOME");
    } else if (location.pathname === "/Profile") {
      setSelect("PROFILE");
    } else if (location.pathname === "/Settings") {
      setSelect("SETTINGS");
    }
  }, [location.pathname]);

  return (
    <div
      id="SIDEBAR"
      className="h-full w-24 md:pt-16 gap-8 flex md:flex-col items-center max-md:h-15 max-md:w-full max-md:justify-center"
    >
      <div
        onClick={(e) => Authenticate(Navigate, "/Home", e)}
        className="h-[60px] w-[60px] rounded-2xl p-1 flex justify-center items-center cursor-pointer max-md:h-12 max-md:w-12"
        style={{ boxShadow: "3px 3px 6px #000000, -2px -2px 6px #484848fb" }}
      >
        <div
          id="HOME"
          className="h-full w-full rounded-xl flex justify-center items-center transition-all duration-300 cursor-pointer"
          style={{ boxShadow: select === "HOME" ? boxShadow : "none" }}
        >
          <Home />
        </div>
      </div>

      <div
        onClick={(e) => Authenticate(Navigate, "/Profile", e)}
        className="h-[60px] w-[60px] rounded-2xl p-1 flex justify-center items-center cursor-pointer max-md:h-12 max-md:w-12"
        style={{ boxShadow: "3px 3px 6px #000000, -2px -2px 6px #484848fb" }}
      >
        <div
          id="PROFILE"
          className="h-full w-full rounded-xl flex justify-center items-center transition-all duration-300 cursor-pointer"
          style={{ boxShadow: select === "PROFILE" ? boxShadow : "none" }}
        >
          <Profile />
        </div>
      </div>
      <div className="md:mt-80">
        {location.pathname === "/" ? <LogInbtn /> : <LogOutbtn />}
      </div>
    </div>
  );
};
export default Sidebar;
