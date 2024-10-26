import { useState,useEffect } from 'react';
import "../../styles/Registration.css";
import { useNavigate } from 'react-router-dom';
import { Button,Dropdown,DropdownButton,ButtonGroup,Row,Col} from 'react-bootstrap';
import ajax from "../../services/fetchService"
//import {useUser} from "../../UserProvider/index"

import Header from "../header/Header";
const RegisterStudent = () => {
  const [step, setStep] = useState(1);



 
  
  const [departments,setDepartments]=useState([]);
  //const user=useUser();
  const [campuses,setCampuses]=useState([]);
    const [blocks,setBlocks]=useState([]);
  const [colleges,setColleges]=useState([]);
  const[selectedColleges,  setSelectedColleges]=useState([]);
  const[selectedDepartments,setSelectedDepartments]=useState([]);
  const[selectedBlocks,setSelectedBlocks]=useState([]);

   const [selectedCampus,setSelectedCampus]=useState("Select Campus");
  const[selectedCollege,setSelectedCollege]=useState('Select College');
  const [selectedDepartment,setSelectedDepartment]=useState('Select Department');
  const [selectedBlock,setSelectedBlock]=useState('Select Block');
  const [selectedYear,setSelectedYear]=useState('Select Year');
  const [finalYear,setFinalYear]=useState(0);
  const [college,setCollege]=useState();
  
  

  
 useEffect(() => {
  fetch("/api/campuses", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
 
      setCampuses(data); // Assuming data is an array of campuses
    })
    .catch((error) => console.error("Error fetching campuses:", error));
}, []);

   useEffect(() => {
  fetch("/api/colleges", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
    
      setColleges(data); // Assuming data is an array of campuses
    })
    .catch((error) => console.error("Error fetching campuses:", error));
}, []);



   




  
  
     useEffect(() => {
  fetch("/api/departments", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      
      setDepartments(data); // Assuming data is an array of campuses
    })
    .catch((error) => console.error("Error fetching campuses:", error));
}, []);


   
     useEffect(() => {
  fetch("/api/blocks", {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
     
      setBlocks(data); // Assuming data is an array of campuses
    })
    .catch((error) => console.error("Error fetching campuses:", error));
}, []);
  

  
  
  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    gender: 'male',
    phoneNumber: '',
    year: '',
    semister: '1',
    roomNo: '',
    block: {},
    department:{},
  });
  
  const handleSubmit = (e) => {
  
    e.preventDefault();
    // Handle form submission, you can send data to the server here
    console.log(formData);
    /*if(formData.fname!=''&&formData.mname
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
    }*/
  };
  
  
  //filter colleges
 useEffect(() => {
  const filteredColleges = colleges.filter((eachCollege) => 
    eachCollege.campus.name === selectedCampus
  );
  
  setSelectedColleges(filteredColleges); 
  setSelectedCollege("Select College");
}, [selectedCampus, colleges]);

 //filter Blocks
    //filter colleges
 useEffect(() => {
  const filteredBlocks = blocks.filter((eachBlock) => 
    eachBlock.campus.name === selectedCampus
  )
  setSelectedBlocks(filteredBlocks); 
  setSelectedBlock("Select  Block");
}, [selectedCampus, blocks]);

  //filter departments
   useEffect(() => {
  const filteredDepartments = departments.filter((eachDepartment) => 
    eachDepartment.college.name === selectedCollege
  );

  setSelectedDepartments(filteredDepartments); 
  setSelectedDepartment("Select Department");
}, [selectedCollege, departments]);
  
  
  useEffect(()=>{
      departments.map((eachDepartment)=>{
      setSelectedYear('Select Year')
      if(eachDepartment.name==selectedDepartment){
        setFinalYear(eachDepartment.finalYear);
       const copyForm={...formData}
       copyForm.department=eachDepartment;
       setFormData(copyForm);
      }
    });
  },[selectedDepartment]);
  
 
  useEffect(()=>{
   console.log("hello hello hello: "+selectedBlock);
     blocks.map((eachBlock)=>{
      if(eachBlock.name+"-0"+eachBlock.blockNo==selectedBlock){
        console.log(eachBlock);
       const copyForm={...formData}
       copyForm.block=eachBlock;
       setFormData(copyForm);
      }
    });
  },[selectedBlock]);
  
  
     useEffect(() => {
        console.log(selectedYear);
        // Update formData with the selectedYear
        setFormData((prevFormData) => ({
            ...prevFormData,
            year: selectedYear, // Update the year in formData
        }));
    }, [selectedYear]);
  
  
   

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
    type="email"
    className="form-control inputM"
    value={formData.email}
    onChange={handleChange}
    name="email"
    required
    pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
  />
  {!formData.email && (
    <div className="text-danger">Email is required.</div>
  )}
  {formData.email && !formData.email.includes("@") && (
    <div className="text-danger">Please enter a valid email containing '@'.</div>
  )}
</div>

                 <div className="mb-3">
  <label className="form-label labelM">Gender</label>
  <div style={{backgroundColor:"#192800",color:"white"}}>
    <label className="form-check-label" style={{"marginRight":"10%"}}>
      <input
        type="radio"
        className="form-check-input"
        value="male"
        checked={formData.gender === "male"}
        onChange={handleChange}
        name="gender"
      />
      Male
    </label>
    <label className="form-check-label ms-3">
      <input
        type="radio"
        className="form-check-input"
        value="female"
        checked={formData.gender === "female"}
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
                    title={selectedCampus}
                    onSelect={
                         (selectedElement)=>{
                           setSelectedCampus(selectedElement)
                         }
                        }
                     >
                       {
                      campuses.map((campus)=>(
                      <Dropdown.Item
                        className="inputM"
                        key={campus.id}
                        eventKey={campus.name}>
                      {campus.name}
                      </Dropdown.Item>
                      ))
                    }
                      
                     </DropdownButton>
                  </div>
                  
                    <div className="mb-3">
                    <label className="form-label labelM">College</label>
                    
                    <DropdownButton 
                     variant="info"
                    title={selectedCollege}
                    onSelect={
                         (selectedElement)=>{
                           setSelectedCollege(selectedElement)
                         }
                        }
                     >
                       {
                      selectedColleges.map((college)=>(
                      <Dropdown.Item
                        className="inputM"
                        key={college.id}
                        eventKey={college.name}>
                      {college.name}
                      </Dropdown.Item>
                      ))
                    }
                      
                     </DropdownButton>
                  </div>
                  
                 
                  <div className="mb-3">
                    <label className="form-label labelM">Department</label>
                    <DropdownButton
                        variant="info"
                        title={selectedDepartment}
                        
                        onSelect={
                         (selectedElement)=>{
                           setSelectedDepartment(selectedElement)
                         }
                        }>
                    {
                      selectedDepartments.map((department)=>(
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
  <DropdownButton
    variant="info"
    title={selectedYear}
    onSelect={(selectedElement) => {
      setSelectedYear(selectedElement);
    }}
  >
    {Array.from({ length: finalYear }).map((_, i) => (
      <Dropdown.Item className="inputM" key={i+1} eventKey={i+1}>
        {i+1}
      </Dropdown.Item>
    ))}
  </DropdownButton>
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
  <label className="form-label labelM">Semester</label>
   <div style={{backgroundColor:"#192800",color:"white"}}>
     <label className="form-check-label" style={{"marginRight":"10%"}}htmlFor="semester1">
      <input
        type="radio"
        className="form-check-input"
        id="semester1"
        value="1"
        checked={formData.semister === '1'}
        onChange={handleChange}
        name="semister"
        required
      />
     1</label>
   
     <label className="form-check-label" htmlFor="semester2">
      <input
        type="radio"
        className="form-check-input"
        id="semester2"
        value="2"
        checked={formData.semister === '2'}
        onChange={handleChange}
        name="semister"
        required
      />
     2</label>
  
  </div>
 
</div>


                   <div className="mb-3">
                    <label className="form-label labelM ">Block</label>
                    <DropdownButton
                        variant="info"
                        title={selectedBlock}
                        onSelect={
                         (selectedElement)=>{
                           setSelectedBlock(selectedElement)
                         }
                        }>
                    {
                      selectedBlocks.map((block)=>(
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

