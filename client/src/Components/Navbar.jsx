import { useEffect, useState } from 'react';
import { Search, Logo, Avatar } from "../assets/svgs"
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/components.css"
const Navbar = () => {
    const location = useLocation();
    const Navigate = useNavigate();
    const [user, setUser] = useState({});
    useEffect(() => {
        if (location.pathname === "/") { return; }
        const fetchUser = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/user`,
                    {
                        method: 'GET',
                        credentials: 'include'
                    });
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                } else {
                    Navigate("/Login")
                }
            } catch (error) {
                console.error('Error:', error);
                Navigate("/Login")
            }
        }
        fetchUser();
    }, [Navigate, location.pathname]);
    return (
        <div className="h-16 w-full flex justify-center items-center">
            <div id="LOGO" className="relative h-full w-1/5 flex items-center gap-2 text-white text-xl font-semibold max-md:w-1/6 lg:pl-8 max-md:justify-center max-lg:justify-end">
                <div className=" h-12 w-12 rounded-lg flex justify-center items-center" style={{
                    boxShadow: 'inset 2px 2px 4px #000000, inset -1px -1px 4px #484848fb'
                }}>
                    <Logo />
                </div>
                <span className='max-md:hidden'>
                    NeuGames
                </span>
            </div>
            <div className="h-full w-3/5 flex justify-center items-center max-md:w-4/6">
                <div id="SEARCH" className="h-4/6 w-4/5 pl-2 rounded-md flex justify-center items-center" style={{ boxShadow: "inset 2px 2px 4px #000000, inset -1px -1px 4px #484848fb" }}>
                    <input className='search' type="text" name="search" placeholder="Search" />
                    <div className="h-[38px] w-[38px] rounded-md flex justify-center items-center hover:bg-[#8c8c8c23] duration-200">
                        <Search />
                    </div>
                </div>
            </div>
            <div className="h-full w-1/5 gap-2 flex items-center justify-center max-md:w-1/6">
                <div className="h-[55px] w-[55px] rounded-full flex justify-center items-center" style={{ boxShadow: 'inset 2px 2px 4px #000000,inset -1px -1px 4px #484848fb' }} >
                    {user.avatar ? <img src={user.avatar} alt="avatar" className='h-11 w-11 rounded-full' /> : <Avatar />}
                </div>
                <div className="max-md:hidden h-13 w-3/4 pl-2 rounded-lg font-semibold flex items-center" style={{ boxShadow: 'inset 2px 2px 4px #000000,inset -1px -1px 4px #484848fb' }}>
                    <div className="h-fit w-full text-white text-ellipsis text-lg overflow-hidden">
                        {user.username}
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Navbar
