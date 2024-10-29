import Navigation from '../profile/AdminNavigation';
import MUU from "../images/MU1.png";
import styles from "../styles/index.module.scss";
import Header from './header/Header';


const AdminDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <div className={styles.contentOverlay}>
        <h1>Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;