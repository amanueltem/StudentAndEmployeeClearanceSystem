import { Button, Card, Row, Col } from 'react-bootstrap';
import ajax from "../../../services/fetchService";
import { useUser } from "../../../UserProvider/index";
import { useEffect, useState } from 'react';
import ViewStaffHeader from "../../header/ViewStaffHeader";
import { useNavigate, Link } from 'react-router-dom';
//import styles from "../../../styles/Card2.module.scss";
import "../../../styles/Registration.css";
import styles from "../../../styles/table.css";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const HRRegistrar = () => {
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const user = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ajax('/api/college_users/hr', 'GET', user.jwt)
      .then((data) => {
        setDatas(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Failed to load data");
      });
  }, [user.jwt]);

  useEffect(() => {
    setFilteredData(datas);
    console.log(datas);
  }, [datas]);

  const handleDelete = (staffId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This student will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        ajax(`/api/college_users/${staffId}`, 'DELETE', user.jwt)
          .then(() => {
            setDatas((prevDatas) => prevDatas.filter((data) => data.id !== staffId));
            Swal.fire('Deleted!', 'The staff has been deleted.', 'success');
          })
          .catch(() => {
            toast.error("Not successfully deleted.");
          });
      }
    });
  };

  const ResponseFormatter = ({ col1, col2, col3, col4 }) => (
    <Row>
      <Col>
        <label className="labelM ">{col1}</label>
      </Col>
      <Col>
        <label className="labelM">{col2}</label>
      </Col>
      <Col>
        <label className="labelM fullName">{col3}</label>
      </Col>
      <Col>
        <Link to={`/view_status/${col4}`} style={{ cursor: "pointer" }}>
          <label className="labelM">Details</label>
        </Link>
      </Col>
    </Row>
  );

  return (
    <div className="main-container">
      <ViewStaffHeader />
      <div className="main-content">
        {isLoading && <Loader />}
        <h1 className={styles.registrarTitle}>List of HR</h1>
        <div className={styles.HrRegistrar}>
          <Row style={{ backgroundColor: '#ccccff' }}>
            <Col><label className="fullName">Staff ID</label></Col>
            <Col><label className="fullName">Full Name</label></Col>
            <Col><label>College</label></Col>
            <Col><label>Details</label></Col>
          </Row>
          {filteredData && filteredData.map((data, index) => (
            <ResponseFormatter
              key={index}
              col1={data.account.username}
              col2={data.fname + " " + data.mname}
              col3={data.college.name}
              col4={data.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default HRRegistrar;
