import Navigation from '../../profile/ViewStaffNavigation';
import { Row, Col } from 'react-bootstrap';
import ViewStaffHeader from "../header/ViewStaffHeader";

const ViewStaff = () => {
  return (
    <div>
          <ViewStaffHeader/>
          <h1 style={{"paddingLeft":"30%","paddingTop":"5%","fontSize":"4rem"}}>Wellcome to staff management.</h1>
       
    </div>
  );
};

export default ViewStaff;

