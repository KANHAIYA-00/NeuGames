import "../Styles/components.css";
import Game from "../Components/Game.jsx";
import Slide from "../Components/Slide.jsx";
import { useState, useEffect } from "react";

const Home = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}api/games`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        if (response.ok) {
          setGames(result);
        } else {
          Error(result.Message);
        }
      } catch (error) {
        console.error("Error:", error);
        Error("Something Went Wrong.");
      }
    };
    fetchGames();
  }, []);

  return (
    <div
      id="MAIN"
      className="h-full w-[95vw] pl-2 rounded-ss-2xl overflow-y-scroll custom-scrollbar max-md:w-full max-md:rounded-2xl"
      style={{ boxShadow: "inset 5px 5px 6px #111111e6" }}
    >
      <div className="h-1/4 w-5/6 flex flex-col justify-center ml-10 max-md:ml-5">
        <span className="text-[#ffffff] text-5xl font-semibold tracking-tight">
          Play Now
        </span>
        <span className="text-gray-400 text-xl font-semibold mt-1">
          Games for the gamers.
        </span>
        <hr className="border-[1.5px] border-gray-400 pl-10 mt-1 w-2/6 max-md:w-4/6" />
      </div>
      <span className="text-[#ffffff] text-2xl font-semibold pl-10">
        Top picks
      </span>
      <div
        id="SLIDER"
        className="h-2/6 w-full pl-10 pr-4 gap-5 flex flex-col flex-wrap justify-center items-center custom-scrollbar overflow-x-scroll overflow-hidden max-md:p-2"
      >
        <Slide name="Tic-tac-toe" background="/images/tictac.png" />
        <Slide name="" background="/images/photo3.png" />
        <Slide name="" background="/images/photo1.png" />
        <Slide name="Tic-tac-toe" background="/images/tictac.png" />
        <Slide name="" background="/images/photo3.png" />
        <Slide name="" background="/images/photo1.png" />
        <Slide name="Tic-tac-toe" background="/images/tictac.png" />
        <Slide name="" background="/images/photo3.png" />
        <Slide name="" background="/images/photo1.png" />
        <Slide name="Tic-tac-toe" background="/images/tictac.png" />
      </div>
      <span className="text-[#ffffff] text-2xl font-semibold pl-10">
        More games
      </span>
      <div
        id="GAMES"
        className="flex flex-wrap gap-8 pl-10 pb-5 mt-5 max-md:p-2"
      >
        {games.map((game) => (
          <Game key={game.name} name={game.name} image={game.image} />
        ))}
      </div>
    </div>
  );
};

export default Home;
