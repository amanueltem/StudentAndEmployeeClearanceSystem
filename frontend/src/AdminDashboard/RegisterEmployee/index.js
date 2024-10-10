import { useState,useEffect } from 'react';
import Navigation from '../../profile/AdminNavigation';
import { useNavigate } from 'react-router-dom';
import { Button,Dropdown,DropdownButton,ButtonGroup,Row,Col} from 'react-bootstrap';
import ajax from "../../services/fetchService"
import {useUser} from "../../UserProvider/index"
import Header from '../header/Header';
import "../../styles/Registration.css";
const RegisterEmployee = () => {
  const [step, setStep] = useState(1);
  const [colleges,setColleges]=useState([]);
  const [campuses,setCampuses]=useState([]);
  const [blocks,setBlocks]=useState([]);
  const [departments,setDepartments]=useState([]);
  const [selectedDepartments,setSelectedDepartments]=useState([]);
  const [selectedColleges,setSelectedColleges]=useState([]);
  const [selectedBlocks,setSelectedBlocks]=useState([]);
   const [roleEnums,setRoleEnums]=useState([]);
  const user=useUser();
  const [campusName,setCampusName]=useState('Select Campus');
  const [collegeName,setCollegeName]=useState('Select College');
  const [departmentName,setDepartmentName]=useState('Select Department');
  const [blockName,setBlockName]=useState('Select Block');
  const[roleValue,setRoleValue]=useState('Select Role');
 
  
  useEffect(()=>{
    ajax("/api/campuses","GET",user.jwt)
    .then((campusData)=>{
    setCampuses(campusData);
    }
    );
  },[])
  
  useEffect(()=>{
  ajax("/api/blocks","GET",user.jwt)
  .then((blockData)=>{
      setBlocks(blockData);
      }
      );
      },[])
  useEffect(()=>{
     ajax("/api/colleges","GET",user.jwt)
     .then(
     (collegeData)=>{
     setColleges(collegeData)
     });
     
  },[]);
  
  
  useEffect(()=>{
   ajax("/api/departments","GET",user.jwt)
   .then(
   (departmentData)=>{
   setDepartments(departmentData);
   }
   );
  },[])
  

    useEffect(()=>{
   const arr=[];
   colleges.slice().sort((a,b)=>a.name>b.name);
   //console.log(colleges)
      colleges.map((college)=>{
      if(campusName===college.campus.name){
         arr.push(college);
       }
       
      }
      );
   
      setCollegeName('Select College');
      setSelectedColleges(arr);
  },[campusName])
  
  
  useEffect(()=>{
   const arr=[];
      blocks.map((block)=>{
      if(campusName===block.campus.name){
         arr.push(block);
       }
       
      }
      );
   
      setBlockName('Select Block');
      setSelectedBlocks(arr);
  },[campusName])
  
  useEffect(()=>{
   const arr=[];
      departments.map((department)=>{
      if(collegeName===department.college.name){
         arr.push(department);
       }
       
      }
      );
   
      setDepartmentName('Select Department');
      setSelectedDepartments(arr);
  },[collegeName])
  
  
    useEffect(()=>{
    setCampusName('Select Campus');
    const copyForm=formData;
    roleEnums.map((role)=>{
     if(roleValue===role.roleValue){
      copyForm.roleName=role.roleName;
     }
    });
    
    setFormData(copyForm);
  },[roleValue])
  
    
  
  const filterRole=(enums)=>
  {
    const copyEnums=[];
    enums.map((eachEnum)=>{
      if(eachEnum.roleValue!=="Student" && eachEnum.roleValue!=="Admin" && eachEnum.roleValue!=="Employee"
      && eachEnum.roleValue!=="HR"){
        copyEnums.push(eachEnum);
      }
    });
    setRoleEnums(copyEnums);
  }
  
  useEffect(()=>
  {
     ajax('/api/authorities','GET',user.jwt).
     then((data)=>{
         filterRole(data);
       }
       );
  }
  ,[]);
  
  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    gender: '',
    phoneNumber: '',
    roleName:'',
    campus:{},
    college:{},
    block: {},
    department:{},
  });
  
  
  
  const handleSubmit = (e) => {
  
   e.preventDefault();
   
    
    console.log(formData);
    
    if(roleValue==="Select Role"){
     alert("Please Select Role")
    }
    else if(formData.fname!=''&&formData.mname
    !=''&&formData.lname!='' &&
    formData.email!='',formData.gender!=''&&formData.phoneNumber!='' && campusName!=='Select Campus'){
     if((roleValue==='Library Circulation' || roleValue==='Registrar' ||
        roleValue==='Department Head' || roleValue==='College Dean') && collegeName==='Select College'){
          alert("Please Select College");
        }
     else if(roleValue==='Proctor' && blockName==='Select Block'){
       alert("Please Select Block");
     }  
     else if(roleValue==='Department Head' && departmentName==='Select Department'){
       alert("Please Select Department");
     } 
     else{
       
       if(roleValue==='Department Head'){
         ajax('/api/dept_users','POST',user.jwt,formData).
         then((data)=>{
           if(data==='conflict') alert('Email already taken or There is another Department Head for '+formData.department.name);
           else alert(roleValue+' successfuly Registered!');
         });
         
         }
         else if (roleValue==='Library Circulation' || roleValue==='Registrar' || roleValue==='College Dean'){
            ajax('/api/college_users','POST',user.jwt,formData).
            then((data)=>{
            if(data==='conflict'){ 
            
            if(roleValue=='College Dean')
             alert("Email alrady taken! or There is another College dean for "+formData.college.name);
             else{
             alert('Email already taken! ');
            }
            }
            else alert(roleValue+' sucessfuly registered!');
         });
         }
         else if(roleValue==='Proctor'){
         console.log("inside proctor");
          ajax('/api/proctors','POST',user.jwt,formData).
          then((data)=>{
          if(data==='conflict') alert('Email already taken!');
          else alert('Proctor sucessfuly registered!')
          }
          );
         }
         else{
           ajax('/api/campus_users','POST',user.jwt,formData).
           then((data)=>{
           if(data==='conflict') alert('Email already taken!');
           else alert(roleValue+' Sucessfuly registered!');
            });
            }
         }
    
    }
    else{
    alert("please fill all required fileds");
    }
  };
  
  useEffect(()=>{
      selectedDepartments.map((eachDepartment)=>{
      if(eachDepartment.name==departmentName){
       const copyForm={...formData}
       copyForm.department=eachDepartment;
       setFormData(copyForm);
      }
    });
  },[departmentName]);
  
   useEffect(()=>{
      colleges.map((eachCollege)=>{
      if(eachCollege.name==collegeName){
       const copyForm={...formData}
       copyForm.college=eachCollege;
       setFormData(copyForm);
      }
    });
  },[collegeName]);
  
   useEffect(()=>{
      campuses.map((eachCampus)=>{
      if(eachCampus.name==campusName){
       const copyForm={...formData}
       copyForm.campus=eachCampus;
       setFormData(copyForm);
      }
    });
  },[campusName]);
  
  useEffect(()=>{
      selectedBlocks.map((eachBlock)=>{
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
                <div className="col-md-8 col-lg-6 forms">
                  <div className="mb-3 ">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.fname}
                      onChange={handleChange}
                      name="fname"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Middle Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.mname}
                      onChange={handleChange}
                      name="mname"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
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
                <div className="col-md-8 col-lg-6 forms">
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Gender</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.gender}
                      onChange={handleChange}
                      name="gender"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
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
                <div className="col-md-8 col-lg-6 forms">
                
                
                    <div className="mb-3">
                    <label>Role</label>
                    
                    <DropdownButton 
                     variant="info"
                     
                    title={roleValue}
                    onSelect={
                     (selectedElement)=>{
                     setRoleValue(selectedElement)
                     }
                    }>
                     {
                      roleEnums.map((role)=>(
                       <Dropdown.Item key={role.roleValue}
                       eventKey={role.roleValue}
                       >
                       {role.roleValue}
                       </Dropdown.Item>
                      )
                      )
                     }
                     </DropdownButton>
                  </div>
                  {
                  roleValue==="Student Cafeteria" || roleValue==="Campus Police"?
                  (
                  <>
                  </>
                  ):
                  (
                 <div className="mb-3">
                    <label>Campus</label>
                    
                    <DropdownButton 
                     variant="info"
                     
                    title={campusName}
                    onSelect={
                     (selectedElement)=>{
                     setCampusName(selectedElement)
                     }
                    }>
                     {
                      campuses.map((campus)=>(
                       <Dropdown.Item key={campus.id}
                       eventKey={campus.name}
                       >
                       {campus.name}
                       </Dropdown.Item>
                      )
                      )
                     }
                     </DropdownButton>
                  </div>
                  )
                  }
                  
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
                <div className="col-md-8 col-lg-6 forms">
                 {
                 roleValue=='Library Circulation' || roleValue==='Registrar'
                 || roleValue==='Department Head' || roleValue==='College Dean' ?
                 (
                   <div className="mb-3">
                    <label>College</label>
                    
                    <DropdownButton 
                     variant="info"
                     
                    title={collegeName}
                    onSelect={
                     (selectedElement)=>{
                     setCollegeName(selectedElement)
                     }
                    }>
                     {
                      selectedColleges.map((college)=>(
                       <Dropdown.Item key={college.id}
                       eventKey={college.name}
                       >
                       {college.name}
                       </Dropdown.Item>
                      )
                      )
                     }
                     </DropdownButton>
                  </div>
                  ):
                  (<>
                  </>
                  )
                  
                }
                {
                roleValue==="Department Head" ?
                (
                  <div className="mb-3">
                    <label>Department</label>
                    <DropdownButton
                        variant="info"
                        title={departmentName}
                        onSelect={
                         (selectedElement)=>{
                           setDepartmentName(selectedElement)
                         }
                        }>
                    {
                      selectedDepartments.map((department)=>(
                      <Dropdown.Item
                        key={department.id}
                        eventKey={department.name}>
                      {department.name}
                      </Dropdown.Item>
                      ))
                    }
                    </DropdownButton>
                  </div>
                 ):
                 (
                 <>
                 </>
                 )
                 }
                 
                 {
                 roleValue==="Proctor" ?
                 (
                   <div className="mb-3">
                    <label>Block</label>
                    <DropdownButton
                        variant="info"
                        title={blockName}
                        onSelect={
                         (selectedElement)=>{
                           setBlockName(selectedElement)
                         }
                        }>
                    {
                      selectedBlocks.map((block)=>(
                      <Dropdown.Item
                        key={block.id}
                        eventKey={block.name+"-0"+block.blockNo}>
                      {block.name+"-0"+block.blockNo}
                      </Dropdown.Item>
                      ))
                    }
                    </DropdownButton>
                  </div>):
                  (<>
                  </>
                  )
                
                  }
                </div>
                
                {
                roleValue==='Student Cafeteria' || roleValue==='Campus Police'?
                (
                <div className="col-md-8 col-lg-6 forms">
                <div className="mb-3">
                    <label>Campus</label>
                    
                    <DropdownButton 
                     variant="info"
                     
                    title={campusName}
                    onSelect={
                     (selectedElement)=>{
                     setCampusName(selectedElement)
                     }
                    }>
                     {
                      campuses.map((campus)=>(
                       <Dropdown.Item key={campus.id}
                       eventKey={campus.name}
                       >
                       {campus.name}
                       </Dropdown.Item>
                      )
                      )
                     }
                     </DropdownButton>
                  </div>
                  </div>):
                  (
                  <>
                  </>
                  )
                  }
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

export default RegisterEmployee;
