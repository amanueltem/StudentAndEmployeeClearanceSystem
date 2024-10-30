import { useEffect, useState } from 'react';
import ajax from "../../../services/fetchService";
import { useUser } from "../../../UserProvider/index";
import { Link } from 'react-router-dom';
import "../../../styles/Registration.css";
import styles from "../../../styles/table.css";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const ProctorViewComponent = ({ url }) => {
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Select Filter Type");
  const filteredReasons = ['By Staff Id', 'By Campus', 'All'];
  const [showStaffId, setShowStaffId] = useState(false);
  const [showCampus, setShowCampus] = useState(false);
  const [staffId, setStaffId] = useState('');
  const [campus, setCampus] = useState('');

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
    switch (selectedFilter) {
      case "By Staff Id":
        setShowStaffId(true);
        setShowCampus(false);
        break;
      case "By Campus":
        setShowCampus(true);
        setShowStaffId(false);
        break;
      default:
        setShowStaffId(false);
        setShowCampus(false);
        setStaffId('');
        setCampus('');
        break;
    }
  }, [selectedFilter]);

  const handleStaffIdChange = (e) => {
    setStaffId(e.target.value);
  };

  const handleCampusChange = (e) => {
    setCampus(e.target.value);
  };

  useEffect(() => {
    let filtered = datas;

    if (selectedFilter === "By Staff Id" && staffId) {
      filtered = filtered.filter(data => data.account.username.includes(staffId));
    } else if (selectedFilter === "By Campus" && campus) {
      // Adjust to a case-insensitive match
      filtered = filtered.filter(data => data.block.campus.name.toLowerCase().includes(campus.toLowerCase()));
    }

    setFilteredData(filtered);
  }, [staffId, campus, selectedFilter, datas]);

  const ResponseFormatter = ({ col1, col2, col3, col4 }) => (
    <div className="row">
      <div className="col"><label className="labelM">{col1}</label></div>
      <div className="col"><label className="labelM fullName">{col2}</label></div>
      <div className="col"><label className="labelM">{col3}</label></div>
        <div className="col"><label className="labelM">{col4}</label></div>
      <div className="col">
        <Link to={`/view_cafeteria/${col4}`} style={{ cursor: "pointer" }}>
          <label className="labelM">Details</label>
        </Link>
      </div>
    </div>
  );
  
  return (
    <div>
      {isLoading && <Loader />}
      <div className={styles.HrRegistrar}>
        <div className="filter-container">
          <label className={styles.formLabel}>Filter</label>
          <select
            className="dropdown"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option>Select Filter Type</option>
            {filteredReasons.map((reason, index) => (
              <option key={index} value={reason}>
                {reason}
              </option>
            ))}
          </select>

          {showStaffId && (
            <input
              type="text"
              placeholder="Enter Staff ID"
              required
              value={staffId}
              onChange={handleStaffIdChange}
              className="input-field"
            />
          )}
          
          {showCampus && (
            <input
              type="text"
              placeholder="Enter Campus Name"
              required
              value={campus}
              onChange={handleCampusChange}
              className="input-field"
            />
          )}
        </div>

        {/* Header Row */}
        <div className="row" style={{ backgroundColor: '#ccccff' }}>
          <div className="col"><label className="fullName">Staff ID</label></div>
          <div className="col"><label className="fullName">Full Name</label></div>
          <div className="col"><label>Block</label></div>
          <div className="col"><label>Campus</label></div>
          <div className="col"><label>Details</label></div>
        </div>

        {filteredData && filteredData.map((data, index) => (
          <ResponseFormatter
            key={index}
            col1={data.account.username}
            col2={`${data.fname} ${data.mname}`}
            col3={data.block.name+"-"+data.block.blockNo}
            col4={data.block.campus.name}
            col5={data.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProctorViewComponent;
