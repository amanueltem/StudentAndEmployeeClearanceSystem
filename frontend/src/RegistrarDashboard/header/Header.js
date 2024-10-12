import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "../../styles/Header.module.scss";
import {  FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import muLogo from "../../images/mekelle.png";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {useUser} from "../../UserProvider/index";
import {jwtDecode} from "jwt-decode"

const logo = (
  <div className={styles.logo}>
    <Link to="/dashboard">
      <h2>
        <img src={muLogo}/>
        <div>MU<span>Clearance</span></div>
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const user=useUser();
     const decoded_jwt = jwtDecode(user.jwt);
useEffect(()=>{

   setDisplayName(decoded_jwt.fname);
   console.log(decoded_jwt.isdefault);
},[]);

  const navigate = useNavigate();



  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

 

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };



 

  return (
    <>
      <header className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
          {logo}

          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
            
              <li>
                <NavLink to="/dashboard" className={activeLink}>
                  Home
                </NavLink>
              </li>
            
              <li>
                <NavLink to="/register" className={activeLink}>
                    Register
                  </NavLink>
              </li>
              <li>
                <NavLink to="/view_request" className={activeLink}>
                Requests
                </NavLink>
              </li>
             
             
               <li>
                <NavLink to="/students" className={activeLink}>
                 Students
                </NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
              
               
                  <a 
                      onClick={()=>{
                     navigate("/manage_account");
                  }}
                  style={{ color: "#ff7722" }}>
                    <FaUserCircle size={16} />
                    Hi, {displayName}
                  </a>
            
                
                
            
                  <NavLink to="/" onClick={
                  (e)=>{
                        user.setJwt(null);
               // Redirect to the home page
                  navigate('/');
                  }}>
                    Logout
                  </NavLink>
         
              </span>
              
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
