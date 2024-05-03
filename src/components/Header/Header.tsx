import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleSetActive = (route: string) => {
    setActiveLink(route);
  };

  const linkClass = (route: string) =>
    `flex-none w-22 text-xs font-medium  my-9 ${
      activeLink === route ? "text-rose-600" : "text-black"
    }`;

  return (
    <div className="bg-white h-20 shadow-md">
      <div className="flex space-x-8 mr-24">
        <div className="flex-1 w-1/2 text-2xl text-gray-600 font-bold mx-5 my-6">Movies DB</div>
        <div className={linkClass(ROUTES.HOME)} onClick={() => handleSetActive(ROUTES.HOME)}><Link to={ROUTES.HOME}>HOME</Link></div>
        <div className={linkClass(ROUTES.POPULAR)} onClick={() => handleSetActive(ROUTES.POPULAR)}><Link to={ROUTES.POPULAR}>POPULAR</Link></div>
        <div className={linkClass(ROUTES.TOP_RATED)} onClick={() => handleSetActive(ROUTES.TOP_RATED)}><Link to={ROUTES.TOP_RATED}>TOP RATED</Link></div>
        <div className={linkClass(ROUTES.NOW_PLAYING)} onClick={() => handleSetActive(ROUTES.NOW_PLAYING)}><Link to={ROUTES.NOW_PLAYING}>NOW PLAYING</Link></div>
        <div className={linkClass(ROUTES.MY_FAVORITES)} onClick={() => handleSetActive(ROUTES.MY_FAVORITES)}><Link to={ROUTES.MY_FAVORITES}>MY FAVORITES</Link></div>
      </div>
    </div>
  );
}

export default Header;
