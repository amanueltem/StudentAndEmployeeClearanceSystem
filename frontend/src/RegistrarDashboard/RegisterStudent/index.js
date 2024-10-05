import { useState,useEffect } from 'react';
import "../../styles/Registration.css";
import { useNavigate } from 'react-router-dom';
import { Button,Dropdown,DropdownButton,ButtonGroup,Row,Col} from 'react-bootstrap';
import ajax from "../../services/fetchService"
import {useUser} from "../../UserProvider/index"

import Header from "../header/Header";
const RegisterStudent = () => {
  const [step, setStep] = useState(1);

  const [blocks,setBlocks]=useState([]);
  const [block,setSelectedBlock]=useState();
  const [departments,setDepartments]=useState([]);
  const user=useUser();
  const [campus,setCampus]=useState('Select Campus');
  const [college,setCollege]=useState('Select College');
  const [departmentName,setDepartmentName]=useState('Select Department');
  const [blockName,setBlockName]=useState('Select Block');
  
  
  

  
  useEffect(()=>{
  ajax("/api/blocks/incampus","GET",user.jwt)
  .then((blockData)=>{
       console.log(blockData);
      setBlocks(blockData);
      setCampus(blockData[0].campus.name);
      }
      );
      },[])

  
  
  useEffect(()=>{
   ajax("/api/departments/incollege","GET",user.jwt)
   .then(
   (departmentData)=>{
   setDepartments(departmentData);
   setCollege(departmentData[0].college.name);
   }
   );
  },[])
  

  
  
  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    gender: '',
    phoneNumber: '',
    year: '',
    semister: '',
    roomNo: '',
    block: {},
    department:{},
  });
  
  const handleSubmit = (e) => {
  
    e.preventDefault();
    // Handle form submission, you can send data to the server here
    console.log(formData);
    if(formData.fname!=''&&formData.mname
    !=''&&formData.lname!='' &&
    formData.email!='',formData.gender!=''&&formData.phoneNumber!=''
    &&formData.year!=''&&formData.semister!=''&&formData.roomNo!=''&&blockName!='Select Block'&&departmentName!='Select Department'){
  ajax('/api/students','POST',user.jwt,formData).
    then((data)=>{
     if(data==='conflict')
     alert('Email already taken!')
     else alert("Student sucessfuly Registered.");
    
    }).catch((e)=>alert('Email already taken.') );
    }
    else{
    alert("please fill all required fileds");
    }
  };
  
  useEffect(()=>{
      departments.map((eachDepartment)=>{
      if(eachDepartment.name==departmentName){
       const copyForm={...formData}
       copyForm.department=eachDepartment;
       setFormData(copyForm);
      }
    });
  },[departmentName]);
  
 
   useEffect(()=>{
   console.log("hello hello hello: "+blockName);
     blocks.map((eachBlock)=>{
      if(eachBlock.name+"-0"+eachBlock.blockNo==blockName){
       const copyForm={...formData}
       copyForm.block=eachBlock;
       setFormData(copyForm);
      }
    });
  },[blockName]);
   

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Handle form submission or any final actions
      console.log('Form submitted:', formData);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const navigate = useNavigate();

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
                      value={formData.fname}
                      onChange={handleChange}
                      name="fname"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">Middle Name</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={formData.mname}
                      onChange={handleChange}
                      name="mname"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">Last Name</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={formData.lname}
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
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">Gender</label>
                    <input
                      type="text"
                      className="form-control inputM"
                      value={formData.gender}
                      onChange={handleChange}
                      name="gender"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">Phone Number</label>
                    <input
                      type="number"
                      className="form-control inputM"
                      value={formData.phoneNumber}
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
                    <label className="form-label labelM">Campus</label>
                    
                    <DropdownButton 
                     variant="info"
                    title={campus}
                     >
                   
                       <Dropdown.Item key={campus}
                       eventKey={campus}
                       className="inputM"
                       >
                       {campus}
                       </Dropdown.Item>
                      
                     </DropdownButton>
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">College</label>
                    
                    <DropdownButton 
                     variant="info"
                     
                    title={college}
                   >
                    
                       <Dropdown.Item key={college}
                       eventKey={college}
                       className="inputM"
                       >
                       {college}
                       </Dropdown.Item>
                     
                     </DropdownButton>
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">Department</label>
                    <DropdownButton
                        variant="info"
                        title={departmentName}
                        
                        onSelect={
                         (selectedElement)=>{
                           setDepartmentName(selectedElement)
                         }
                        }>
                    {
                      departments.map((department)=>(
                      <Dropdown.Item
                        className="inputM"
                        key={department.id}
                        eventKey={department.name}>
                      {department.name}
                      </Dropdown.Item>
                      ))
                    }
                    </DropdownButton>
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">Year</label>
                    <input
                      type="number"
                      className="form-control inputM"
                      value={formData.year}
                      onChange={handleChange}
                      name="year"
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
                    <label className="form-label labelM">Semister</label>
                    <input
                      type="number"
                      className="form-control inputM"
                      value={formData.semister}
                      onChange={handleChange}
                      name="semister"
                    />
                  </div>
                   <div className="mb-3">
                    <label className="form-label labelM ">Block</label>
                    <DropdownButton
                        variant="info"
                        title={blockName}
                        onSelect={
                         (selectedElement)=>{
                           setBlockName(selectedElement)
                         }
                        }>
                    {
                      blocks.map((block)=>(
                      <Dropdown.Item
                        key={block.id}
                        eventKey={block.name+"-0"+block.blockNo}
                        className="inputM">
                      {block.name+"-0"+block.blockNo}
                      </Dropdown.Item>
                      ))
                    }
                    </DropdownButton>
                  </div>
                  <div className="mb-3">
                    <label className="form-label labelM">Room Number</label>
                    <input
                      type="number"
                      className="form-control inputM"
                      value={formData.roomNo}
                      onChange={handleChange}
                      name="roomNo"
                    />
                  </div>
                  
                </div>
              </div>
            </div>
          </div>     
        );
      default:
        return null;
    }
  };

return (
  <div className="justify-content-center">
         <Header/>
        <form onSubmit={handleSubmit}>
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
                  )}
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
                  {step === 4 && (
                    <Button
                      type="submit"
                      variant="success"
                      className="me-5"
                      size="lg"
                    >
                      Register
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
  
  </div>
);

};

export default RegisterStudent;

