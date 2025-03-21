import Sidebar from "./Components/Sidebar.jsx";
import Navbar from "./Components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [Component, setComponent] = useState(null);
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2] || "";
    if (currentPath) {
      import(`../games/${currentPath}/${currentPath}.jsx`)
        .then((module) => setComponent(() => module.default))
        .catch((error) => console.error("Error loading component", error));
    } else {
      setComponent(null);
    }
  }, [location]);

  return (
    <div id="BODY" className="h-[100vh] w-full bg-[#282828]">
      <Navbar />
      <div className="h-[91.8vh] w-full flex max-md:flex-col max-md:gap-1">
        {!isSmallScreen && <Sidebar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route
            path="/Game/:gameName"
            element={Component ? <Component /> : <div>Game not found</div>}
          />
        </Routes>
        {isSmallScreen && <Sidebar />}
      </div>
    </div>
  );
};
export default App;
