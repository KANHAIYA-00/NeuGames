import PropTypes from 'prop-types';
import Button from './Button.jsx';
import { useNavigate } from "react-router-dom";
import Authenticate from "../Functions/Authenticate.jsx";

const Slide = ({ background, name }) => {
    const Navigate = useNavigate();
    return (
        <div onClick={(e) => Authenticate(Navigate, `/Game/${name}`, e)} id="SLIDE" className="h-52 w-96 p-2 rounded-3xl overflow-hidden group cursor-pointer hover:bg-[#25D366] transition-all duration-300 max-md:w-80" style={{ boxShadow: "3px 3px 8px #000000, -2px -2px 8px #484848fb" }}>
            <div id="COVER" className='h-full w-full p-1 rounded-2xl flex justify-center items-center'
                style={{ boxShadow: "inset 2px 2px 4px #000000,inset -1px -1px 4px #484848fb" }}>
                <img src={background} alt="" className='h-full w-full rounded-xl ' />
            </div>
            <Button />
        </div>
    )
}
Slide.propTypes = {
    background: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};
export default Slide
