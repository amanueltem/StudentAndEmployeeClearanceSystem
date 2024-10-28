import Header from "../header/Header";
import ajax from '../../services/fetchService'
import {useUser} from "../../UserProvider/index";
import {useEffect,useState} from 'react';
import { Button, Card ,Row,Col,Container} from "react-bootstrap";
import StatusBadge from "../../StatusBadge/index";
import {useNavigate} from 'react-router-dom'
import Loader from "../../components/Loader";
import "../../styles/Registration.css";
const ResponseDetail=()=>
{
 const responseId = window.location.href.split("/view_status/")[1];
 const user=useUser();
 const [clearanceResponse,setClearanceResponse]=useState('');
 const navigate=useNavigate();
  const [isLoading, setIsLoading] = useState(false);
 const position={"ROLE_CAFETERIA":"Student Cafeteria","ROLE_DEPARTMENT_HEAD":"Deaprtment Head",
 "ROLE_COLLEGE_DEAN":"College Dean","ROLE_PROCTOR":"Proctor","ROLE_LIBRARY":"Librerian",
 "ROLE_REGISTRAR":"Registrar","ROLE_CAMPUS_POLICE":"Campus Police"};
 useEffect(()=>{
    setIsLoading(true);
   ajax(`/api/responses/${responseId}`,'GET',user.jwt).
   then((data)=>{
   setClearanceResponse(data);
   setIsLoading(false);
   });
 },[]);
 
    const ResponseFormatter=(col)=>{
   return(
        <Row>
       <Col>
        <b><label className="labelM">{col.col1}</label></b>
        </Col>
        <Col>
        {
        col.col1==='Response Info:'?
        <b><label  style={{color:'#0acdff'}} className="labelM">{col.col2}</label></b>
        :
        <label  className="labelM">{col.col2}</label>
        }
        </Col>
        </Row>
   )
  };
  
 return (
 <div>
                  
           <Header/>
              {isLoading && <Loader />}
          <h1 style={{paddingLeft:"40%",paddingTop:"3%",fontSize:"4rem"}}>Response Details # {responseId}</h1>
           {
        clearanceResponse ?
        (
        <>
        <div className="detail">
                <div className="d-flex align-items-start mt-5">
        
        <StatusBadge text={clearanceResponse.status} className="labelM"></StatusBadge>
                                    </div>
        <ResponseFormatter col1="Response id:" col2={`#${clearanceResponse.id}`}/>
        <ResponseFormatter col1="Requested Date:" col2={clearanceResponse.requestedDate}/>
        {
        clearanceResponse.responseDate&&<ResponseFormatter col1="Responsed Date:" col2={clearanceResponse.responseDate}/>
        }
        {
        (clearanceResponse.responseInfo&&clearanceResponse.status==="rejected"
        )&& <ResponseFormatter col1="Response Info:" col2={clearanceResponse.responseInfo}/>
        }
        
        <ResponseFormatter col1="Name:" col2={clearanceResponse.fname
        +" "+clearanceResponse.mname
        + " "+clearanceResponse.lname}/>
        <ResponseFormatter col1="Position:" col2={position[clearanceResponse.position]}/>
        <ResponseFormatter col1="Phone Number:" col2={clearanceResponse.phoneNumber}/>
       </div>
        <Button size="lg"
        variant="secondary"
        onClick={
        (e)=>{
         navigate(-1);
        }
        }>
        Back
        </Button>
     
        </>
        )
        :
        (
         <h1>
          Loading...
         </h1>
        )
        }
     
 </div>)
}
export default ResponseDetail;
