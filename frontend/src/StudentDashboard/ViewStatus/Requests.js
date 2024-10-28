import Navigation from '../header/Header';
import { Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import styles from "../../styles/Card.module.scss";
import { useUser } from "../../UserProvider/index";
import { useState, useEffect } from 'react';
import ajax from '../../services/fetchService';
import StatusBadge from "../../StatusBadge/index";
import Loader from "../../components/Loader";
const Requests = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState('');
  const [clearanceRequests, setClearanceRequests] = useState(null);

 const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    ajax("/api/requests/self", "GET", user.jwt)
      .then((data) => {
        setClearanceRequests(data)
        setIsLoading(false);
      })
      .catch((error) => {console.error("Error fetching clearance requests:", error);
        setIsLoading(false)});
  }, [user.jwt]);

  useEffect(() => {
    setIsLoading(true);
    ajax('/api/students/self', 'GET', user.jwt)
      .then((data) =>{ setStudentData(data)
        setIsLoading(false)})
      .catch((error) => {console.error("Error fetching student data:", error)
        setIsLoading(false)});
  }, [user.jwt]);

  const RequesterFormatter = ({ col1, col2 }) => (
    <Row>
      <Col>
        <label>{col1}</label>
      </Col>
      <Col>
        <label>{col2}</label>
      </Col>
    </Row>
  );

  const RequestFormatter = ({ request }) => (
    <Card key={request.id} style={{ width: "30rem", height: "30rem" }} className={`${styles.card}`}>
      <Card.Body className="d-flex flex-column justify-content-around">
        <Card.Title className={`${styles.card_title}`}>Reason: {request.requestedReason}</Card.Title>
        <div className="d-flex align-items-start">
          <StatusBadge text={request.status} />
        </div>
        <Card.Text style={{ marginTop: "1em" }} className={`${styles.card_text}`}>
          <p><b>Date:</b> {request.requestedDate}</p>
        </Card.Text>
        <Button className={`${styles.btn}`} variant="primary" onClick={() => navigate(`/view_request/${request.id}`)}>
          More
        </Button>
      </Card.Body>
    </Card>
  );

  const renderRequestsByStatus = (status, title) => (
    <div className="response-wrapper submitted">
      <div className="h3 px-2 response-wrapper-title" style={{ marginLeft: "5%", marginTop: "3%" }}>
        {title}
      </div>
      {
        clearanceRequests && clearanceRequests.filter(request => request.status === status).length > 0 ? (
          <div className={`d-grid gap-5 ${styles.cards}`} style={{ gridTemplateColumns: "repeat(auto-fit,30rem)" }}>
            {clearanceRequests
              .filter(request => request.status === status)
              .map(request => <RequestFormatter key={request.id} request={request} />)}
          </div>
        ) : (
          <div style={{ marginLeft: "5%", marginTop: "3%" }}>There are no {title.toLowerCase()} requests</div>
        )
      }
    </div>
  );

  return (
    <div>
      <Navigation />
         {isLoading && <Loader />}
      {
        studentData && (
          <div className="detail">
            <RequesterFormatter col1="Requester:" col2={`${studentData.fname} ${studentData.mname}`} />
            <RequesterFormatter col1="Campus:" col2={studentData.department.college.campus.name} />
            <RequesterFormatter col1="Department:" col2={studentData.department.name} />
            <RequesterFormatter col1="Block:" col2={`${studentData.block.name}-0${studentData.block.blockNo}`} />
          </div>
        )
      }
      {renderRequestsByStatus("Pending", "Pending")}
      {renderRequestsByStatus("rejected", "Rejected")}
      {renderRequestsByStatus("accepted", "Accepted")}
    </div>
  );
};

export default Requests;
