import Avatar from './Avatar';
import { useUser } from "../UserProvider/index";
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import logo from '../images/mekelle.png';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const NavHeader = () => {
  const navigate = useNavigate();
  const user = useUser();

  const handleLogout = () => {
    user.setJwt(null);
    // Redirect to the home page
    navigate('/');
  };

  const getRoleFromJWT = () => {
    if (user.jwt) {
      const decoded_jwt = jwtDecode(user.jwt);
      return decoded_jwt.authorities;
    }
    return [];
  };

  const [roles, setRoles] = useState(getRoleFromJWT());

  return (
    <div style={{ backgroundColor: "#ccdfdd" }}>
      <Row>
        <Col xs={6}>
        <div className="d-inline-flex">
          <img src={logo} style={{ height: "70px", width: "150px" }} />
          <div style={{marginRight:'20px',fontSize:'1.5em',fontWeight:'bold'}}>Mu Clearance System</div>
          </div>
        </Col>
        <Col xs={6} className="text-end"> {/* Adjust the alignment within the second Col */}
      
          <div className="d-inline-flex align-items-center justify-content-end">
            
            <Avatar style={{ marginRight: '5px' }} />
            <div style={{ color: "blue" ,marginLeft:'10px'}}>
              {roles.find((role) => role === "ROLE_REGISTRAR") ?
                (
                  <>
                    signed as Registrar.
                  </>
                ) :
                (
                 roles.find((role)=>role==="ROLE_STUDENT")?
                 (
                  <>
                    Signed as Student.
                  </>
                  ):
                  (
                  roles.find((role)=>role==="ROLE_ADMIN")?
                  (
                  <>
                  Signed as Admin.
                  </>
                  ):
                  (
                  <>
                  Signed as Staff.
                  </>
                  )
                  )
                )
              }
              <button onClick={handleLogout} style={{ marginLeft: '10px', marginRight: '15px' }}>Logout</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NavHeader;

