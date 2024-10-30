import { Button, Card, Row, Col } from 'react-bootstrap';
import ajax from "../../services/fetchService";
import { useUser } from "../../UserProvider/index";
import { useEffect, useState } from 'react';
import Header from "../header/Header";
import { useNavigate, Link } from 'react-router-dom';
//import CampusViewComponent from "./CampusViewComponent";  // Correct import without extra "s"
import "../../styles/Registration.css";
import "../../styles/table.css";  // Importing CSS file without 'styles' alias

import Loader from "../../components/Loader";

import ToviewStudent from './ToviewStudent';

const ViewStudent = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="main-container">
      <Header />
      <div className="main-content">
        {isLoading && <Loader />}
        <h1 className="registrarTitle">List of Students</h1>  {/* Use regular CSS classes */}
        <div className="HrRegistrar">  {/* Use regular CSS classes */}
          <ToviewStudent url="/api/students/all" />
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
