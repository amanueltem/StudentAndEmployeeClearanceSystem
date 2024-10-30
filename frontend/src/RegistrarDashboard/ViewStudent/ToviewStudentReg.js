import { useEffect, useState } from 'react';
import ajax from "../../services/fetchService";
import { useUser } from "../../UserProvider/index";
import { Link } from 'react-router-dom';
// import styles from "../../styles/table.css";
import styles from "../../styles/ToviewStudent.css";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { Button } from 'react-bootstrap';
const ToviewStudentReg = ({ url }) => {
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Select Filter Type");
  const filteredReasons = ['By Student Id', 'By Department', 'All'];
  const [showStudentId, setShowStudentId] = useState(false);
  const [showDepartment, setShowDepartment] = useState(false);
  const [studentId, setStudentId] = useState('');
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
      case "By Student Id":
        setShowStudentId(true);
        setShowDepartment(false);
        break;
      case "By Department":
        setShowDepartment(true);
        setShowStudentId(false);
        break;
      default:
        setShowStudentId(false);
        setShowDepartment(false);
        setStudentId('');
        setDepartment('');
        break;
    }
  }, [selectedFilter]);

  const handleStaffIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  useEffect(() => {
    let filtered = datas;

    if (selectedFilter === "By Student Id" && studentId) {
      filtered = filtered.filter(data => data.account.username.includes(studentId));
    } else if (selectedFilter === "By Department" && department) {
      // Adjusted filter logic for department
      filtered = filtered.filter(data =>
        data.department?.name?.toLowerCase().includes(department.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [studentId, department, selectedFilter, datas]);

  const ResponseFormatter = ({ col1, col2, col3, col4 }) => (
    <div className="row">
      <div className="col"><label className="labelM">{col1}</label></div>
      <div className="col"><label className="labelM fullName">{col2}</label></div>
      <div className="col"><label className="labelM">{col3}</label></div>
      <div className="col">
      <Link to={`/update_student/${col4}`} className={styles.detailsLink}>
  <label className="labelM">Details</label>
</Link>

        <Button 
          className={styles.deleteButton} 
          onClick={() => handleDelete(col4)} 
          style={{ marginLeft: '10px', cursor: 'pointer' }}
          variant='danger'>
          Delete
        </Button>
      </div>
    </div>
  );

  const handleDelete = (studentId) => {
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
        ajax(`/api/students/${studentId}`, 'DELETE', user.jwt)
          .then(() => {
            const updatedData = datas.filter((data) => data.id !== studentId);
            setDatas(updatedData);
            setFilteredData(updatedData);
            Swal.fire('Deleted!', 'The student has been deleted.', 'success');
          })
          .catch(() => toast.error("Failed to delete student."));
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

          {showStudentId && (
            <input
              type="text"
              placeholder="Enter Student ID"
              required
              value={studentId}
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
          <div className="col"><label className="fullName">Student ID</label></div>
          <div className="col"><label className="fullName">Full Name</label></div>
          <div className="col"><label>Department</label></div>
          <div className="col"><label>Actions</label></div>
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

export default ToviewStudentReg;
