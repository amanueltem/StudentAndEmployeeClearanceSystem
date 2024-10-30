import { Button, Card, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import ajax from "../../../services/fetchService";
import { useUser } from "../../../UserProvider/index";
import { useEffect, useState } from 'react';
import ViewStaffHeader from "../../header/ViewStaffHeader";
import { Link } from 'react-router-dom';
import "../../../styles/Registration.css";
import styles from "../../../styles/table.css";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const CollegeViewComponent = ({ url }) => {
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Select Filter Type");
  const filteredReasons = ['By Staff Id', 'By College', 'All'];
  const [showStaffId, setShowStaffId] = useState(false);
  const [staffId, setStaffId] = useState('');

  useEffect(() => {
    setIsLoading(true);
    ajax(url, 'GET', user.jwt)
      .then((data) => {
        setDatas(data);
        setFilteredData(data); // Initialize filteredData with the fetched data
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Failed to load data");
      });
  }, [url, user.jwt]);

  useEffect(() => {
    if (selectedFilter === "By Staff Id") {
      setShowStaffId(true);
    } else {
      setShowStaffId(false);
      setStaffId(''); // Reset staffId when filter changes
    }
  }, [selectedFilter]);

  const handleChange = (e) => {
    setStaffId(e.target.value);
  };

  useEffect(() => {
    if (selectedFilter === "By Staff Id") {
      const filtered = datas.filter(data => data.account.username.includes(staffId));
      setFilteredData(filtered);
    } else if (selectedFilter === "All") {
      setFilteredData(datas); // Reset to show all data
    } else {
      // Handle filtering by other criteria here (if needed)
      setFilteredData(datas); // Reset to show all data or handle specific logic
    }
  }, [staffId, selectedFilter, datas]);

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
    <div>
      {isLoading && <Loader />}
      <div className={styles.HrRegistrar}>
        <div className="mb-3">
          <label className="form-label labelM">Reason</label>
          <DropdownButton 
            variant="info"
            title={selectedFilter}
            onSelect={(selectedElement) => setSelectedFilter(selectedElement)}
          >
            {filteredReasons.map((reason, index) => (
              <Dropdown.Item
                className="inputM"
                key={index}
                eventKey={reason}
              >
                {reason}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          {showStaffId && (
            <input
              type="text"
              placeholder="Staff Id"
              required
              value={staffId}
              onChange={handleChange}
            />
          )}
        </div>
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
            col2={`${data.fname} ${data.mname}`}
            col3={data.college.name}
            col4={data.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CollegeViewComponent;
