import { useMemo, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { io } from "socket.io-client";
import { ToastContainer } from "react-toastify";
import { Error, Warn } from "../../src/Functions/Toastify.jsx";
import {
  ArrowLeft,
  ArrowRight,
  BCircle,
  BCross,
  Circle,
  Cross,
} from "../../src/assets/svgs.jsx";
import fetchUser from "../../src/Functions/Fetchuser.jsx";

const TicTacToe = () => {
  const socket = useMemo(
    () =>
      io(`${import.meta.env.VITE_SERVER_URL}Game/Tic-tac-toe`, {
        reconnectionAttempts: 5,
        secure: true,
        transports: ["websocket", "polling"],
      }),
    []
  );
  const location = useLocation();
  const [user, setUser] = useState({});
  const [partner, setPartner] = useState({});
  const [play, setPlay] = useState(true);
  const [player, setPlayer] = useState("O");
  const moves = useRef(Array.from({ length: 3 }, () => Array(3).fill(null)));
  const [isWinner, setWinner] = useState({});
  const [display, setDisplay] = useState("none");
  const [count, setCount] = useState(0);
  const [draw, setDraw] = useState("none");

  useEffect(() => {
    const handleFetchUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (error) {
        console.error("Error:", error);
        Error("Unable to connect.");
      }
    };
    handleFetchUser();
  }, []);

  useEffect(() => {
    if (
      user &&
      location.pathname === "/Game/Tic-tac-toe" &&
      !socket.connected
    ) {
      socket.connect();
      socket.on("connect", () => {
        socket.emit("start", {
          SocketID: socket.id,
          username: user.username,
          avatar: user.avatar,
        });
      });
    }
    socket.on("paired", (data) => {
      setPartner(data);
      if ("_id" in data) {
        setPlay(false);
        setPlayer("X");
      }
    });
    socket.on("update", (data) => {
      moves.current[data.i][data.j] = data.player;
      const root = createRoot(
        document.getElementById(`cell-${data.i}-${data.j}`)
      );
      {
        data.player === "O"
          ? root.render(<BCircle />)
          : data.player === "X"
          ? root.render(<BCross />)
          : "";
      }
      setPlay((play) => !play);
    });
    socket.on("result", (winner) => {
      setPlay(false);
      if (winner !== "draw") {
        setWinner(winner);
        setDisplay("");
      } else {
        setDraw("");
      }
    });
    return () => {
      socket.off("result");
      socket.off("update");
      socket.off("paired");
      socket.off("Set");
      socket.disconnect();
    };
  }, [socket, location, user]);
  function winner(player) {
    if (player) {
      setPlay(false);
      setWinner({ name: user.username, avatar: user.avatar });
      socket.emit(
        "win",
        { name: user.username, avatar: user.avatar },
        partner.SocketID
      );
      setDisplay("");
    }
  }
  function check() {
    const a = moves.current;
    if (a[0][0] === "O" && a[0][1] === "O" && a[0][2] === "O") {
      winner(player);
    } else if (a[1][0] === "O" && a[1][1] === "O" && a[1][2] === "O") {
      winner(player);
    } else if (a[2][0] === "O" && a[2][1] === "O" && a[2][2] === "O") {
      winner(player);
    } else if (a[0][0] === "O" && a[1][0] === "O" && a[2][0] === "O") {
      winner(player);
    } else if (a[0][1] === "O" && a[1][1] === "O" && a[2][1] === "O") {
      winner(player);
    } else if (a[0][2] === "O" && a[1][2] === "O" && a[2][2] === "O") {
      winner(player);
    } else if (a[0][0] === "O" && a[1][1] === "O" && a[2][2] === "O") {
      winner(player);
    } else if (a[0][2] === "O" && a[1][1] === "O" && a[2][0] === "O") {
      winner(player);
    } else if (a[0][0] === "X" && a[0][1] === "X" && a[0][2] === "X") {
      winner(player);
    } else if (a[1][0] === "X" && a[1][1] === "X" && a[1][2] === "X") {
      winner(player);
    } else if (a[2][0] === "X" && a[2][1] === "X" && a[2][2] === "X") {
      winner(player);
    } else if (a[0][0] === "X" && a[1][0] === "X" && a[2][0] === "X") {
      winner(player);
    } else if (a[0][1] === "X" && a[1][1] === "X" && a[2][1] === "X") {
      winner(player);
    } else if (a[0][2] === "X" && a[1][2] === "X" && a[2][2] === "X") {
      winner(player);
    } else if (a[0][0] === "X" && a[1][1] === "X" && a[2][2] === "X") {
      winner(player);
    } else if (a[0][2] === "X" && a[1][1] === "X" && a[2][0] === "X") {
      winner(player);
    } else {
      return null;
    }
  }
  useEffect(() => {
    if (count === 5 && !isWinner.name) {
      setDraw("");
      setPlay(false);
      socket.emit("draw", partner.SocketID);
    }
  }, [count, isWinner.name, partner.SocketID, socket]);

  function mark(e, i, j) {
    if (partner.username && play === true) {
      if (moves.current[i][j] === null) {
        moves.current[i][j] = player;
        const root = createRoot(e.target);
        {
          player === "O"
            ? root.render(<BCircle />)
            : player === "X"
            ? root.render(<BCross />)
            : "";
        }
        setPlay((play) => !play);
        setCount(count + 1);
        socket.emit("change", { i, j, player }, partner.SocketID);
        check();
      } else {
        Warn("Invalid move.");
      }
    }
  }
  return (
    <>
      <ToastContainer />
      <div
        id="MAIN"
        className="h-full w-[95vw] rounded-ss-2xl overflow-y-scroll custom-scrollbar flex justify-center items-center max-md:w-full max-md:rounded-se-2xl"
        style={{ boxShadow: "inset 5px 5px 6px #111111e6" }}
      >
        <div
          className="absolute h-80 w-80 rounded-2xl flex flex-col gap-5 items-center bg-[#00000088]"
          style={{ display: `${display}` }}
        >
          <span className="relative font-bold text-4xl text-amber-300">
            🎉WINNER🎉
          </span>
          <div
            className="relative h-28 w-28 rounded-full flex justify-center items-center"
            style={{ boxShadow: "2px 2px 4px #000000,-1px -1px 4px #484848fb" }}
          >
            <img
              src={isWinner.avatar ? isWinner.avatar : "/images/profile.png"}
              alt="photo"
              className="h-28 w-28 rounded-full"
            />
          </div>
          <div className="h-fit w-full overflow-hidden text-white text-ellipsis text-2xl  text-center">
            {isWinner.name}
          </div>
          <span
            onClick={() => window.location.reload()}
            className="h-fit w-fit p-1 text-blue-300 rounded-2xl font-semibold text-xl border-2 border-blue-300 cursor-pointer"
          >
            Play again
          </span>
        </div>

        <div
          className="absolute h-40 w-80 rounded-2xl flex flex-col gap-5 items-center justify-center bg-[#00000088]"
          style={{ display: `${draw}` }}
        >
          <span className="relative font-bold text-4xl text-gray-300">
            DRAW
          </span>
          <span
            onClick={() => window.location.reload()}
            className="h-fit w-fit p-1 text-blue-300 rounded-2xl font-semibold text-xl border-2 border-blue-300 cursor-pointer"
          >
            Play again
          </span>
        </div>

        <div className="h-4/6 w-full flex justify-center items-center">
          <div className="h-fit w-1/6 flex justify-center cursor-pointer max-lg:absolute max-lg:-mt-80 max-lg:mb-20 max-lg:-ml-60">
            <div
              className="absolute h-28 w-28 -mt-16 rounded-full flex justify-center items-center max-lg:h-12 max-lg:w-12"
              style={{
                boxShadow: "2px 2px 4px #000000,-1px -1px 4px #484848fb",
              }}
            >
              <img
                src={user.avatar ? user.avatar : "/images/profile.png"}
                alt="photo"
                className="h-28 w-28 rounded-full max-lg:h-12 max-lg:w-12"
              />
            </div>
            <div
              className="h-40 w-52 flex flex-col items-center justify-end rounded-lg max-lg:h-8 max-lg:w-28"
              style={{
                boxShadow:
                  "inset 2px 2px 4px #000000, inset -1px -1px 4px #484848fb",
              }}
            >
              <div className="h-fit w-full pl-2 pr-2 text-white text-ellipsis text-2xl overflow-hidden text-center">
                {user.username}
              </div>
              <div className="h-fit w-fit flex justify-center items-center max-lg:h-12 max-lg:w-12 max-lg:ml-40 max-lg:absolute">
                {player === "O" ? <Circle /> : <Cross />}
              </div>
            </div>
          </div>

          <div className="h-20 w-20 flex justify-center items-center max-lg:absolute max-lg:mt-96 max-lg:-ml-40">
            {play === true && <ArrowLeft />}
          </div>

          <div
            className="h-96 w-96 rounded-lg flex flex-wrap justify-center items-center max-lg:h-80 max-lg:w-80"
            style={{
              boxShadow:
                "inset 2px 2px 4px #000000,inset -1px -1px 2px #484848fb",
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 justify-center items-center">
                {[...Array(3)].map((_, j) => (
                  <div
                    id={`cell-${i}-${j}`}
                    key={j}
                    className="h-28 w-28 rounded-md cursor-pointer flex justify-center items-center max-lg:h-20 max-lg:w-20"
                    style={{
                      boxShadow: "2px 2px 4px #000000,-1px -1px 2px #484848fb",
                    }}
                    onClick={(e) => mark(e, i, j)}
                  ></div>
                ))}
              </div>
            ))}
          </div>

          <div className="h-20 w-20 flex justify-center items-center max-lg:absolute max-lg:mt-96 max-lg:-mr-40">
            {play === false && <ArrowRight />}
          </div>

          <div className="h-fit w-1/6 flex justify-center cursor-pointer max-lg:absolute max-lg:-mt-80 max-lg:mb-20 max-lg:-mr-60">
            <div
              className="absolute h-28 w-28 -mt-16 rounded-full flex justify-center items-center max-lg:h-12 max-lg:w-12"
              style={{
                boxShadow: "2px 2px 4px #000000,-1px -1px 4px #484848fb",
              }}
            >
              <img
                src={partner.avatar ? partner.avatar : "/images/profile.png"}
                alt="photo"
                className="h-28 w-28 rounded-full max-lg:h-12 max-lg:w-12"
              />
            </div>
            <div
              className="h-40 w-52 flex flex-col items-center justify-end rounded-lg max-lg:h-8 max-lg:w-28"
              style={{
                boxShadow:
                  "inset 2px 2px 4px #000000, inset -1px -1px 4px #484848fb",
              }}
            >
              <div className="h-fit w-full pl-2 pr-2 text-white text-ellipsis text-2xl overflow-hidden text-center">
                {partner.username ? partner.username : "connecting..."}
              </div>
              <div className="h-fit w-fit flex justify-center items-center max-lg:h-12 max-lg:w-12 max-lg:mr-40 max-lg:absolute">
                {player === "O" ? <Cross /> : <Circle />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
