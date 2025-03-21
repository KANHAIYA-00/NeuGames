import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Authenticate from "../Functions/Authenticate.jsx";

const Game = ({ name, image }) => {
    const Navigate = useNavigate();

    return (
        <div onClick={(e) => Authenticate(Navigate, `/Game/${name}`, e)}
            id="GAME" style={{ boxShadow: "3px 3px 6px #000000, -2px -2px 6px #484848fb" }}
            className="h-[200px] w-[200px] rounded-2xl flex justify-center items-end bg-cover overflow-hidden cursor-pointer hover:scale-110 transition-all duration-200 drop-shadow-lg hover:bg-[#f00028] group max-md:h-40 max-md:w-40">
            <div className='h-full w-full p-2 rounded-2xl flex justify-end'>
                <img src={image} alt="" className='h-full w-full rounded-xl' />
                <div className="absolute w-44 text-lg font-semibold text-ellipsis text-white overflow-hidden translate-y-60 group-hover:translate-y-36 transition-all duration-300">
                    {name}
                </div>
            </div>
        </div>
    );
};
Game.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default Game;
