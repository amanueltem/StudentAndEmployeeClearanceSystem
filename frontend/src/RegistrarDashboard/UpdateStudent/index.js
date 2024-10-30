import { useState, useEffect } from 'react';
import "../../styles/Registration.css";
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownButton, ButtonGroup, Row, Col } from 'react-bootstrap';
import ajax from "../../services/fetchService";
import { useUser } from "../../UserProvider/index";
import Header from "../header/Header";

const UpdateStudent = () => {
  const [step, setStep] = useState(1);
  const user = useUser();
  const studentId = window.location.href.split("/update_student/")[1];
  
   const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };
  const [studentData, setStudentData] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    gender: false,
    phoneNumber: '',
    year: '',
    semister: '',
    roomNo: '',
    block: {},
    department: {},
  });
  
  useEffect(() => {
    ajax(`/api/students/${studentId}`, "GET", user.jwt)
      .then((data) => {
      console.log(data);
      if(data.gender===false){
      data.gender="false"
      }
      else
        data.gender="true"
        setStudentData(data);
 
      });
  }, [studentId, user.jwt]);
    
    
    
     const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Handle form submission or any final actions
      console.log('Form submitted:', studentData);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  
   const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <div className="mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 detail">
                  <div className="mb-3">
                    <label className="form-label labelM">First Name</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.fname}
                      onChange={handleChange}
                      name="fname"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">Middle Name</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.mname}
                      onChange={handleChange}
                      name="mname"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">Last Name</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.lname}
                      onChange={handleChange}
                      name="lname"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
        
        
         case 2:
        return (
           <div>
            <div className="mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 detail">
                  <div className="mb-3">
                    <label className="form-label labelM">Email</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.account.email}
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                 <div className="mb-3">
  <label className="form-label labelM">Gender</label>
  <div style={{backgroundColor:"#192800",color:"white"}}>
    <label className="form-check-label">
      <input
        type="radio"
        className="form-check-input"
        value="true"
        checked={studentData.gender ==="false"}
        onChange={handleChange}
        name="gender"
      />
      Male
    </label>
    <label className="form-check-label ms-3">
      <input
        type="radio"
        className="form-check-input"
        value="false"
        checked={studentData.gender ==="true"}
        onChange={handleChange}
        name="gender"
      />
      Female
    </label>
  </div>
</div>

                  <div className="mb-3">
                    <label className="form-label labelM">Phone Number</label>
                    <input
                      type="number"
                      className="form-control inputM"
                      value={studentData.phoneNumber}
                      onChange={handleChange}
                      name="phoneNumber"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );



         case 3:
        return (
           <div>
            <div className="mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 detail">
                  <div className="mb-3">
                    <label className="form-label labelM">StudentId</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.account.username}
               
                      name="studentId"
                    />
                  </div>
                


                   <div className="mb-3">
                    <label className="form-label labelM">Department</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.department.name}
               
                      name="email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label labelM">Block</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.block.name+"-0"+studentData.block.blockNo}
 
                      name="blockNo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );


        case 4:
        return (
           <div>
            <div className="mt-5">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 detail">
                  <div className="mb-3">
                    <label className="form-label labelM">Year</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.year}
               
                      name="year"
                    />
                  </div>
                


                   <div className="mb-3">
                    <label className="form-label labelM">Semister</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.semister}
               
                      name="semister"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label labelM">Room Number</label>
                    <input
                      type="number"
                      className="form-control inputM"
                      value={studentData.roomNo}
                      name="roomNo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );


        }
        }




  return (
    <div>
    <Header/>
       <form className='toForm'>
          {renderFormStep()}
          <div className="text-center">
            <div className="row justify-content-center"> {/* Add a new row for centering */}
              <div className="col-md-8 col-lg-6">
                <div className="mb-3">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      className="me-5"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    )
                    }
                      {step < 4 && (
                    <Button
                      type="button"
                      size="lg"
                      className="me-5"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
              </div>
              </div>
              </div>
              </div>
              </form>
              
    </div>
  );
}

export default UpdateStudent;

