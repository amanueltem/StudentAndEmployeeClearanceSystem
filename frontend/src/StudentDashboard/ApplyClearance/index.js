import Navigation from '../../profile/StudentNavigation';
import { Row, Col,Dropdown,DropdownButton,Button } from 'react-bootstrap';
import NavHeader from '../../profile/NavHeader';
import ajax from '../../services/fetchService'
import {useUser} from '../..//UserProvider/index'
import {useEffect,useState} from 'react'
import Header from "../header/Header";
import "../../styles/Registration.css";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
const ApplyClearance=()=>{
const user=useUser();
 const [isLoading, setIsLoading] = useState(false);
const [reasons,setReasons]=useState([]);
const [reasonName,setReasonName]=useState("select reason");
const[studentData,setStudentData]=useState(null);
useEffect(()=>{
  ajax('/api/reasons','GET',user.jwt).
  then((reasonsData)=>{
    
  setReasons(reasonsData);
  setReasonName("Select Reason");
  }
  );
},[user.jwt]);

useEffect(()=>{
  ajax('/api/students/self','GET',user.jwt)
  .then((data)=>{

    if(data.department.finalYear===data.year&& data.semister===2){
  
    }
    else{
      
      const updatedReasons = reasons.filter(reason => reason.reasonName !== "End of Acadamy");
      console.log(updatedReasons);
      setReasons(updatedReasons);
    }
    setStudentData(data);
  }
  );

},[user.jwt,reasonName]);



const handleApply=(e)=>{
  setIsLoading(true);
if(reasonName==='Select Reason'){
toast.error('Please select your reason!');
setIsLoading(false)
}

else{
 ajax('/api/requests','POST',user.jwt,reasonName).
 then((data)=>{
 if(data==='conflict'){
 toast.error('you already requested clearance before!');
 setIsLoading(false);
 }
 else{
   toast.success('you have successfuly submitted your request');
   setIsLoading(false);
 }
 }
 )
 }
 
}
  return(
  <div>
        <Header/>
         {isLoading && <Loader />}
          <div className="apply">
          
               <label>Reason</label>
                {
                  reasons ?
                  (
                  <div>
                   
                      <DropdownButton
                        variant="info"
                        title={reasonName}
                        onSelect={
                         (selectedElement)=>{
                           setReasonName(selectedElement)
                         }
                        }>
                    {
                      reasons.map((reason)=>(
                      <Dropdown.Item
                        key={reason.reasonName}
                        eventKey={reason.reasonName}>
                      {reason.reasonName}
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
            
                <Button id="submit"
                   type="button" 
                   size="lg"
                   variant="success"
                   onClick={handleApply}
                   >
                  Apply</Button>
          </div>
       
  </div>
  )
}
export default ApplyClearance;
