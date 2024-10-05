import Navigation from '../header/Header';
import Navigation1 from '../../profile/RegistrarNavigation';
import { Button, Card ,Row,Col,Container} from "react-bootstrap"
import {useNavigate} from 'react-router-dom'
import NavHeader from '../../profile/NavHeader';
import {jwtDecode} from 'jwt-decode';
import {useUser} from "../../UserProvider/index";
import {useState,useEffect,useRef} from 'react';
import ajax from '../../services/fetchService'
import StatusBadge from "../../StatusBadge/index"
import Header from "../../RegistrarDashboard/header/Header";
import "../../styles/Registration.css";
const Requests = () => {
  const user=useUser();
  const navigate=useNavigate();
    const responseId = window.location.href.split("/view_request/")[1];
  const[clearanceResponse,setClearanceResponse]=useState(
  {
  status:null,
  clearanceRequest:{requestedDate:null,
  requestedBy:{fname:'',
  mname:'',
  lname:'',
  email:'',
  year:'',
  semister:'',
  block:{name:'',blockNo:''},
  department:{name:''},
       }},
       respnseInfo:null,
  });
   const getRoleFromJWT = () => {
   if(user.jwt){
    const decoded_jwt = jwtDecode(user.jwt);
   return decoded_jwt.authorities;
   }
        return [];
}
     const  [roles,setRoles]=useState(getRoleFromJWT());
     const [details,setDetails]=useState(true);
     const previousResponse=useRef(clearanceResponse);
      const updateResponse = (prop, value) => {
    const newResponse = { ...clearanceResponse };
    newResponse[prop] = value;
    setClearanceResponse(newResponse);
  }
     useEffect(()=>{
        ajax(`/api/responses/${responseId}`,"GET",user.jwt).
        then((data)=>{
        setClearanceResponse(data);
        });
     },[])
     
 useEffect(()=>{
   if(clearanceResponse.status){
     ajax(`/api/responses/details/${clearanceResponse.clearanceRequest.id}`,"GET",user.jwt).
     then((details)=>{
      
      
      details.map((detail,index)=>
      {
     if(roles.find((role)=>role==="ROLE_REGISTRAR"))
     {
       if(detail.position!=="ROLE_REGISTRAR"&&(detail.status==="pending" || detail.status==="rejected")){
        setDetails(false);
        return;
       }
     }
     else{
       if(detail.position==="ROLE_REGISTRAR" &&detail.status==="accepted"){
        setDetails(false);
        return;
       }
     }
     }
     )
     });
   }
 },[clearanceResponse]);
     
     const persist=()=>{
     ajax("/api/responses", "PUT", user.jwt, clearanceResponse)
      .then((responseData) => {
        setClearanceResponse(responseData);
      }).catch((message) => console.log(message));
  }
    
    function save(status){
  if(status && clearanceResponse.status !==status){
      updateResponse("status",status);
    }
    else{
        persist();
      }
  }
  
      useEffect(()=>{
      
     if(previousResponse.current.status!==clearanceResponse.status){
       persist();
     }
     previousResponse.current=clearanceResponse;
     
   },[clearanceResponse]);
     
      const ResponseFormatter=(col)=>{
   return(
        <Row>
       <Col>
        <b><label  className="form-label labelM">{col.col1}</label></b>
        </Col>
        <Col>
        <label  className="form-label labelM">{col.col2}</label>
        </Col>
        </Row>
   )
  };
 
  return (
    <div>
     
        
      
      
      <Row>
       
       
       
        { 
        roles.find((role)=>role==="ROLE_REGISTRAR")?
        (
          <Header/>
          ):
          (
          <Navigation/>
          )
          }
     
        <Col xs={9} lg={10}>
        {
        clearanceResponse ?
        (
        <div className="detail">
                <div className="d-flex align-items-start mt-5">
        
        <StatusBadge text={clearanceResponse.status}></StatusBadge>
                                    </div>
        <ResponseFormatter col1="Response id:" col2={`#${clearanceResponse.id}`}/>
        <ResponseFormatter col1="Requested Date:" col2={clearanceResponse.clearanceRequest.requestedDate}/>
        {
        clearanceResponse.responseDate&&<ResponseFormatter col1="Responsed Date:" col2={clearanceResponse.responseDate}/>
        }
        <ResponseFormatter col1="Reason:" col2={clearanceResponse.clearanceRequest.requestedReason}/>
        <ResponseFormatter col1="Name:" col2={clearanceResponse.clearanceRequest.requestedBy.fname
        +" "+clearanceResponse.clearanceRequest.requestedBy.mname
        + " "+clearanceResponse.clearanceRequest.requestedBy.lname}/>
        <ResponseFormatter col1="Department:" col2={clearanceResponse.clearanceRequest.requestedBy.department.name}/>
        <ResponseFormatter col1="Phone Number:" col2={clearanceResponse.clearanceRequest.requestedBy.phoneNumber}/>
        <ResponseFormatter col1="Email:" col2={clearanceResponse.clearanceRequest.requestedBy.email}/>
        <ResponseFormatter col1="Class Year:" col2={clearanceResponse.clearanceRequest.requestedBy.year}/>
        <ResponseFormatter col1="Semister:" col2={clearanceResponse.clearanceRequest.requestedBy.semister}/>
        {
         roles.find((role)=>role==="ROLE_PROCTOR")?
         (
         <>
          <ResponseFormatter col1="Block:" col2={clearanceResponse.clearanceRequest.requestedBy.block.name
          +"-0"+clearanceResponse.clearanceRequest.requestedBy.block.blockNo}/>
          <ResponseFormatter col1="Room No:" col2={clearanceResponse.clearanceRequest.requestedBy.roomNo}/>
         </>
         ):
         (
         <>
         </>
         )
        }
        <Row>
        {
         
          clearanceResponse.status==='rejected' ?
          (<>
          <Col>
          <b><label  className="form-label labelM">Response INFO:</label></b>
         </Col>
         <Col>
          <input className="inputM" type="text" value={clearanceResponse.responseInfo} onChange={(e)=>updateResponse("responseInfo",e.target.value)} />
           </Col>
          </>
          )
          :
          (<>
          </>
          )
        
        }
        </Row>
        <Row className="btns">
        <Col>
         <Button size="lg" variant="success"
         onClick={
         (e)=>{
           if(roles.find((role)=>role==="ROLE_REGISTRAR") )
           
           {
            details ? updateResponse('status','accepted')
            :
            alert("The requester does not fulfill all required signatures.");
           }
           else{
              updateResponse('status','accepted')
           }
        
         }
         }>
          Accept
         </Button>
        </Col>
        <Col>
        <Button size="lg" variant="danger" onClick={(e)=>{
            if(roles.find((role)=>role==="ROLE_REGISTRAR") )
           
           {
             details ? updateResponse('status','rejected')
             :
             alert("The requester must fulfil all required signatures");
           }
           else{
             details ? updateResponse('status','rejected')
            :
            alert("Contact the registrar because the requester is accepteted by registrar.");
           }
        }
        }>
        Reject
        </Button>
        </Col>
         <Col>
        <Button size="lg" variant="primary" onClick={(e)=>{
         console.log(clearanceResponse.responseInfo);
           ajax("/api/responses", "PUT", user.jwt, clearanceResponse)
      .then((responseData) => {
        setClearanceResponse(responseData);
      }).catch((message) => console.log(message));
        }}>
         sendInfo
        </Button>
        </Col>
        <Col>
        <Button size="lg"
        variant="secondary"
        onClick={
        (e)=>{
         navigate('/view_request');
        }
        }>
        Back
        </Button>
        </Col>
        </Row>
        </div>
        )
        :
        (
         <h1>
          Loading...
         </h1>
        )
        }
        </Col>
      </Row>
    </div>
  );
};

export default Requests;

