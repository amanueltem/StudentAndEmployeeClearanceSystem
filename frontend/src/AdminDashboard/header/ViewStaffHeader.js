import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./ViewStaffHeader.module.scss";
import { FaUserCircle, FaTimes, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import muLogo from "../../images/mekelle.png";
import { useUser } from "../../UserProvider/index";
import {jwtDecode} from "jwt-decode";

// the updated viewStaffHeadr
const ViewStaffHeader = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCollegeStaff, setShowCollegeStaff] = useState(false);
  const [showCampusStaff, setShowCampusStaff] = useState(false);
  const [showDepartmentStaff, setShowDepartmentStaff] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const user = useUser();
  const decoded_jwt = jwtDecode(user.jwt);
  const navigate = useNavigate();

  useEffect(() => {
    setDisplayName(decoded_jwt.sub.split('@')[0]);
  }, [decoded_jwt]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      {/* Top horizontal header */}
      <div className={styles.topHeader}>
        <div className={styles.logoSection}>
          <Link to="/dashboard" className={styles.logo}>
            <img src={muLogo} alt="MU Logo" />
            <span>MU<span>Clearance</span></span>
          </Link>
        </div>
        <div className={styles.userSection}>
          <span className={styles.userGreeting}>
            <FaUserCircle size={16} /> Hi, {displayName}
          </span>
          <NavLink
            to="/"
            onClick={() => {
              user.setJwt(null);
              navigate('/');
            }}
            className={styles.logoutLink}
          >
            Logout
          </NavLink>
          <HiOutlineMenuAlt3 size={28} onClick={toggleSidebar} className={styles.menuIcon} />
        </div>
      </div>

      {/* Vertical Sidebar for navigation links */}
      <div className={`${styles.sidebar} ${showSidebar ? styles.show : ""}`}>
        <FaTimes size={22} color="#fff" onClick={toggleSidebar} className={styles.closeIcon} />
        <nav>
          <ul className={styles.ul}>
            <li>
              <NavLink to="/dashboard" className={styles.homeLink}>Back To Home</NavLink>
            </li>
            <li>
              <div onClick={() => setShowCollegeStaff(!showCollegeStaff)} className={styles.navLink}>
                College Staff {showCollegeStaff ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {showCollegeStaff && (
                <ul className={styles.subMenu}>
                  <li><NavLink to="/view_staff/librarians"className={styles.navLink}>Librarians</NavLink></li>
                  <li><NavLink to="/view_staff/college_deans" className={styles.navLink} >College Deans</NavLink></li>
                  <li><NavLink to="/view_staff/registrars" className={styles.navLink}>Registrars</NavLink></li>
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => setShowCampusStaff(!showCampusStaff)} className={styles.navLink}>
                Campus Staff {showCampusStaff ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {showCampusStaff && (
                <ul className={styles.subMenu}>
                  <li><NavLink to="/view_staff/cefeterias" className={styles.navLink}>Cafeterias</NavLink></li>
                  <li><NavLink to="/view_staff/proctors" className={styles.navLink}>Proctors</NavLink></li>
                  <li><NavLink to="/view_staff/campus_polices" className={styles.navLink}>Campus Police</NavLink></li>
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => setShowDepartmentStaff(!showDepartmentStaff)} className={styles.navLink}>
                Department Staff {showDepartmentStaff ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {showDepartmentStaff && (
                <ul className={styles.subMenu}>
                  <li><NavLink to="/view_staff/departments" className={styles.navLink}>Department Head</NavLink></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ViewStaffHeader;