import Navigation from '../../profile/StudentNavigation';
import { Row, Col,Dropdown,DropdownButton,Button } from 'react-bootstrap';
import NavHeader from '../../profile/NavHeader';
import ajax from '../../services/fetchService'
import {useUser} from '../..//UserProvider/index'
import {useEffect,useState} from 'react'
import Header from "../header/Header";
import "../../styles/Registration.css";
const ApplyClearance=()=>{
const user=useUser();
const [reasons,setReasons]=useState([]);
const [reasonName,setReasonName]=useState("Select Reason");
useEffect(()=>{
  ajax('/api/reasons','GET',user.jwt).
  then((reasonsData)=>{
  setReasons(reasonsData);
  }
  );
},[]);

const handleApply=(e)=>{
if(reasonName==='Select Reason'){
alert('Please select your reason!');
}
else{
 ajax('/api/requests','POST',user.jwt,reasonName).
 then((data)=>{
 if(data==='conflict'){
 alert('you already requested clearance before!');
 }
 else{
   alert('you have successfuly submitted your request');
 }
 }
 )
 }
 
}
  return(
  <div>
        <Header/>
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
