import { useEffect, useState } from 'react';
import ajax from "../../../services/fetchService";
import { useUser } from "../../../UserProvider/index";
import { Link } from 'react-router-dom';
import "../../../styles/Registration.css";
import styles from "../../../styles/table.css";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const DepartmentHead = ({ url }) => {
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Select Filter Type");
  const filteredReasons = ['By Staff Id', 'By Department', 'All'];
  const [showStaffId, setShowStaffId] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [staffId, setStaffId] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    setIsLoading(true);
    ajax(url, 'GET', user.jwt)
      .then((data) => {
        setDatas(data);
        setFilteredData(data); // Initialize filteredData with fetched data
        console.log(data); // Log data to inspect the structure
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
        setShowDepartment(false);
        break;
      case "By Department":
        setShowDepartment(true);
        setShowStaffId(false);
        break;
      default:
        setShowStaffId(false);
        setShowDepartment(false);
        setStaffId('');
        setDepartment('');
        break;
    }
  }, [selectedFilter]);

  const handleStaffIdChange = (e) => {
    setStaffId(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  useEffect(() => {
    let filtered = datas;

    if (selectedFilter === "By Staff Id" && staffId) {
      filtered = filtered.filter(data => data.account.username.includes(staffId));
    } else if (selectedFilter === "By Department" && department) {
      // Adjusted filter logic for department
      filtered = filtered.filter(data => 
        data.department?.name?.toLowerCase().includes(department.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [staffId, department, selectedFilter, datas]);

  const ResponseFormatter = ({ col1, col2, col3, col4 }) => (
    <div className="row">
      <div className="col"><label className="labelM">{col1}</label></div>
      <div className="col"><label className="labelM fullName">{col2}</label></div>
      <div className="col"><label className="labelM">{col3}</label></div>
      <div className="col">
        <Link to={`/update_college_staff/${col4}`} style={{ cursor: "pointer" }}>
          <label className="labelM">Details</label>
        </Link>
      </div>
    </div>
  );

  const handleDelete = (staffId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This staff will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        ajax(`/api/dept_users/${staffId}`, 'DELETE', user.jwt)
          .then(() => {
            const updatedData = datas.filter((data) => data.id !== staffId);
            setDatas(updatedData);
            setFilteredData(updatedData);
            Swal.fire('Deleted!', 'The staff has been deleted.', 'success');
          })
          .catch(() => toast.error("Failed to delete staff."));
      }
    });
  };

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

          {showDepartment && (
            <input
              type="text"
              placeholder="Enter Department Name"
              required
              value={department}
              onChange={handleDepartmentChange}
              className="input-field"
            />
          )}
        </div>

        {/* Header Row */}
        <div className="row" style={{ backgroundColor: '#ccccff' }}>
          <div className="col"><label className="fullName">Staff ID</label></div>
          <div className="col"><label className="fullName">Full Name</label></div>
          <div className="col"><label>Department</label></div>
          <div className="col"><label>Details</label></div>
        </div>

        {filteredData && filteredData.map((data, index) => (
          <ResponseFormatter
            key={index}
            col1={data.account.username}
            col2={`${data.fname} ${data.mname}`}
            col3={data.department?.name || "N/A"}
            col4={data.id}
          />
        ))}
      </div>
    </div>
  );
};

export default DepartmentHead;
