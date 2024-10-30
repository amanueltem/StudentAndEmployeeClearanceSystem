import { Button, Card, Row, Col } from 'react-bootstrap';
import ajax from "../../../services/fetchService";
import { useUser } from "../../../UserProvider/index";
import { useEffect, useState } from 'react';
import ViewStaffHeader from "../../header/ViewStaffHeader";
import { useNavigate, Link } from 'react-router-dom';
import CollegeViewComponent from "./CollegeViewComponent";  // Correct import without extra "s"
import "../../../styles/Registration.css";
import "../../../styles/table.css";  // Importing CSS file without 'styles' alias

import Loader from "../../../components/Loader";

const HRRegistrar = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="main-container">
      <ViewStaffHeader />
      <div className="main-content">
        {isLoading && <Loader />}
        <h1 className="registrarTitle">List of HR</h1>  {/* Use regular CSS classes */}
        <div className="HrRegistrar">  {/* Use regular CSS classes */}
          <CollegeViewComponent url="/api/college_users/HRRegistrars" />
        </div>
      </div>
    </div>
  );
};

export default HRRegistrar;
