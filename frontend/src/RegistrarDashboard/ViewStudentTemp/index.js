import { useState, useEffect } from 'react';
import "../../styles/Registration.css";
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownButton, ButtonGroup, Row, Col } from 'react-bootstrap';
import ajax from "../../services/fetchService";
import { useUser } from "../../UserProvider/index";
import Header from "../header/Header";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
const ViewStudentTemp = () => {
  const [step, setStep] = useState(1);
  const user = useUser();
   const [isLoading, setIsLoading] = useState(false);
  const studentId = window.location.href.split("/view_student_temp/")[1];
  

   const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };
  const [studentData, setStudentData] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    gender:'',
    phoneNumber: '',
    year: '',
    semister: '',
    roomNo: '',
    block: {},
    department: {},
  });
  
  useEffect(() => {
    setIsLoading(true);
    ajax(`/api/tempo_students/${studentId}`, "GET", user.jwt)
      .then((data) => {
      console.log(data);
    
        setStudentData(data);
        setIsLoading(false);
 
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


    const handleSubmit = (e) => {
  
    e.preventDefault();
    setIsLoading(true);
    ajax('/api/students','POST',user.jwt,studentData).
    then((data)=>{
      setIsLoading(false);
     if(data==='conflict'){
     toast.error('you have already registered. wait for approval.')
   }
     else toast.success("Student Sucessfully registered.");
    
    }).catch((e)=>{toast.error('Email already taken.');
    setIsLoading(false)});
    
  }

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
                    
                      name="mname"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">Last Name</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.lname}
                    
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
                      value={studentData.email}
               
                      name="email"
                    />
                  </div>
                


                   <div className="mb-3">
                    <label className="form-label labelM">Gender</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={studentData.gender}
               
                      name="email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label labelM">Phone Number</label>
                    <input
                      type="number"
                      className="form-control inputM"
                      value={studentData.phoneNumber}
                   
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
                      value={studentData.studentId}
               
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
     {isLoading && <Loader />}
       <form>
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
                  )

                }

                 {step==4 && (
                    <Button
                      type="button"
                      size="lg"
                      className="me-5"
                      onClick={handleSubmit}
                      variant="success"
                    >
                      Register
                    </Button>
                  )
                  
                }
              </div>
              </div>
              </div>
              </div>
              </form>
              
    </div>
  );
}

export default ViewStudentTemp;

