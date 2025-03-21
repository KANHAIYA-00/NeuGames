import { Login } from "../assets/svgs";

const LogInbtn = () => {
  return (
    <div>
      <div
        className="h-[45px] w-[45px] rounded-full p-1 flex justify-center items-center cursor-pointer"
        style={{ boxShadow: "3px 3px 6px #000000, -2px -2px 6px #484848fb" }}
      >
        <div
          id="LOGIN"
          className="h-full w-full rounded-full flex justify-center items-center transition-all duration-300 cursor-pointer"
          onClick={() => (window.location.href = "/Login")}
        >
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LogInbtn;
