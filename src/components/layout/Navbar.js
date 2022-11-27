import React from 'react';
import * as FaIcons from "react-icons/fa";
 
const Navbar = () => {
  return (
    <>
        <div className="navbar__container">
            <a href="#">
                <FaIcons.FaBars/>
            </a>
        </div>
    </>
  )
}

export default Navbar