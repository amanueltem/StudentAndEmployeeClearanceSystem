import { Link } from 'react-router-dom';
import { FaKey, FaHome } from "react-icons/fa";

const AccountManage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh', paddingTop: '5%' }}>
      <h1 style={{ fontSize: '4rem', margin: '5% 0' }}>
        Account management.
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         <Link to="/reset_default" style={{ margin: '10px 0', fontSize: '2rem', display: 'flex', alignItems: 'center' }}>
          <FaKey style={{ marginRight: '8px' }} />
          Reset Password
        </Link>
        <Link to="/dashboard" style={{ margin: '10px 0', fontSize: '2rem', display: 'flex', alignItems: 'center' }}>
          <FaHome style={{ marginRight: '8px' }} />
          Back to Home
        </Link>
     
      </div>
    </div>
  );
};

export default AccountManage;

