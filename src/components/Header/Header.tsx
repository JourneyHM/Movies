import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import { Logo } from "../../assets";
import classNames from "classnames";
import './Header.css';

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState("");

  const basePageClass = classNames({
    "base-page": true,
  });
  const headerStructureClass = classNames({
    "header-str": true,
  });
  const iconClass = classNames({
    "icon-pos": true,
  });
  const pageNameClass = classNames({
    "page-name-properties": true,
  });

  const handleSetActive = (route: string) => {
    setActiveLink(route);
  };

  const linkClass = (route: string) =>
    `flex-none w-22 text-sm font-semibold my-9 ${
      activeLink === route ? "text-violet-400" : "text-white"
    }`;

  return (
    <div className={basePageClass}>
      <div className={headerStructureClass}>
        <div className={iconClass}><img src={Logo} alt='logo'></img></div>
        <div className={pageNameClass}>Journey Movies</div>
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
