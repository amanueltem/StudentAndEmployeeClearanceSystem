import Navigation from '../profile/AdminNavigation';
import MUU from "../images/MU1.png";
import styles from "../styles/index.module.scss";
import Header from "./header/Header"


const HRDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
 
      <div className={styles.contentOverlay}>
      <Header/>
        <h1>HR Dashboard</h1>
      </div>
    </div>
  );
};

export default HRDashboard;