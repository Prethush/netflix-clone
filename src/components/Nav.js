import React, {useState, useEffect} from 'react'
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 100) {
        handleShow(true);
      }else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    }
  }, []);

  return (
    <nav className={`nav ${show && "nav_black"}`}>
      <img className="nav_logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="netflix_logo" />
      <img className="nav_avatar" src="https://cdns.iconmonstr.com/wp-content/assets/preview/2013/240/iconmonstr-smiley-2.png" alt="user_img" />
    </nav>
  )
}

export default Nav
