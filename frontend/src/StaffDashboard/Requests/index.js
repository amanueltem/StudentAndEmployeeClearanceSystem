import Navigation from '../header/Header';
import Header from "../../RegistrarDashboard/header/Header";
import { Button, Card ,Row,Col} from "react-bootstrap"
import {useNavigate} from 'react-router-dom'
import styles from "../../styles/Card.module.scss";
import {jwtDecode} from 'jwt-decode';
import {useUser} from "../../UserProvider/index";
import {useState,useEffect} from 'react';
import ajax from '../../services/fetchService'
import StatusBadge from "../../StatusBadge/index"

const Requests = () => {
  const user=useUser();
  const navigate=useNavigate();
  const[clearanceResponses,setClearanceResponses]=useState(null);
   const getRoleFromJWT = () => {
   if(user.jwt){
    const decoded_jwt = jwtDecode(user.jwt);
   return decoded_jwt.authorities;
   }
        return [];
}
     const  [roles,setRoles]=useState(getRoleFromJWT());
     
     
     useEffect(()=>{
        ajax("/api/responses","GET",user.jwt).
        then((data)=>{
        console.log(data);
        setClearanceResponses(data);
        });
     },[])
     if(clearanceResponses)
   console.log(clearanceResponses[0]); 
  return (
    <div>
    
        { 
        roles.find((role)=>role==="ROLE_REGISTRAR")?
        (
          <Header/>
          ):
          (
          <Navigation/>
          )
          }
    
           <div className="response-wrapper  submitted">
          <div 
          className="h3 px-2 response-wrapper-title" 
          style={{"marginLeft":"5%","marginTop":"3%"}}
          >
          Pending
          </div>
            {
             clearanceResponses?
             ( clearanceResponses.filter((response)=>response.status==="pending").length>0 &&
               (
                <div className={`d-grid gap-5 ${styles.cards}`}
                    style={{ gridTemplateColumns: "repeat(auto-fit,30rem)" }}>{
                         clearanceResponses
                        .filter((response)=>
                        response.status==="pending")
                        .sort((a,b)=>{
                           if(a.status==="pending"){
                              return 1;
                           }
                           else{
                             return -1;
                             
                           }
                        }).map((response) => (
                            <Card key={response.id} style={{ width: "30rem", height: "30rem" }} className={`${styles.card}`}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title className={`${styles.card_title}`}>Reason: {response.clearanceRequest.requestedReason}</Card.Title>
                                    <div className="d-flex align-items-start">
                                   <StatusBadge text={response.status}></StatusBadge>
                                    </div>
                                    <Card.Text style={{ marginTop: "1em" }}  className={`${styles.card_text}`}>
                                        <p><b>Requester Name</b>: {response.clearanceRequest.requestedBy.fname
                                        +" "+response.clearanceRequest.requestedBy.mname}</p>
                                        <p><b>Date</b>: {response.clearanceRequest.requestedDate}</p>
                                        <p><b>Requester Id</b>:{response.clearanceRequest.requestedBy.id}</p>
                                        <p><b>Department</b>: {response.clearanceRequest.requestedBy.department.name}</p>
                                        {
                                        roles.find((role)=>role=="ROLE_PROCTOR")?
                                        (<>
                                        <p><b>Block</b>:{response.clearanceRequest.requestedBy.block.name+"-0"
                                        +response.clearanceRequest.requestedBy.block.blockNo}</p>
                                        </>
                                        ):
                                        (
                                        <>
                                        </>
                                        )
                                        }
                                    </Card.Text>

                                    <Button  className={`${styles.btn}`} variant="primary" onClick={(e) => {
                                        navigate(`/view_request/${response.id}`)
                                    }}>
                                        More
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>)): <div  style={{"marginLeft":"5%","marginTop":"3%"}}>There are no pending requests</div>}
                </div>
                
                
                
                
                 <div className="response-wrapper  submitted">
          <div 
          className="h3 px-2 response-wrapper-title" 
           style={{"marginLeft":"5%","marginTop":"3%"}}
          >
          Rejected
          </div>
            {
             clearanceResponses  && clearanceResponses.filter((response)=>response.status==="rejected").length>0 ? 
               (
                <div className={`d-grid gap-5 ${styles.cards}`}
                    style={{ gridTemplateColumns: "repeat(auto-fit,30rem)" }}>{
                         clearanceResponses
                        .filter((response)=>
                        response.status==="rejected")
                        .sort((a,b)=>{
                           if(a.status==="rejected"){
                              return 1;
                           }
                           else{
                             return -1;
                             
                           }
                        }).map((response) => (
                            <Card key={response.id} style={{ width: "30rem", height: "30rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title className={`${styles.card_title}`}>Reason: {response.clearanceRequest.requestedReason}</Card.Title>
                                    <div className="d-flex align-items-start">
                                   <StatusBadge text={response.status}></StatusBadge>
                                    </div>
                                    <Card.Text Sstyle={{ marginTop: "1em" }} className={`${styles.card_text}`}>
                                        <p><b>Requester Name</b>: {response.clearanceRequest.requestedBy.fname
                                        +" "+response.clearanceRequest.requestedBy.mname}</p>
                                        <p><b>Date</b>: {response.clearanceRequest.requestedDate}</p>
                                        <p><b>Requester Id</b>:{response.clearanceRequest.requestedBy.id}</p>
                                        <p><b>Department</b>: {response.clearanceRequest.requestedBy.department.name}</p>
                                        {
                                        roles.find((role)=>role=="ROLE_PROCTOR")?
                                        (<>
                                        <p><b>Block</b>:{response.clearanceRequest.requestedBy.block.name+"-0"
                                        +response.clearanceRequest.requestedBy.block.blockNo}</p>
                                        </>
                                        ):
                                        (
                                        <>
                                        </>
                                        )
                                        }
                                    </Card.Text>

                                    <Button   className={`${styles.btn}`} variant="primary" onClick={(e) => {
                                        navigate(`/view_request/${response.id}`)
                                    }}>
                                        More
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>) : <div style={{"marginLeft":"5%","marginTop":"3%"}}>There are no rejected requests</div>}
                </div>
                 <div className="response-wrapper  submitted">
          <div 
          className="h3 px-2 response-wrapper-title"
           style={{"marginLeft":"5%","marginTop":"3%"}} 
          >
          Accepted
          </div>
            {
             clearanceResponses  && clearanceResponses.filter((response)=>response.status==="accepted").length>0 ? 
               (
                <div  className={`d-grid gap-5 ${styles.cards}`}
                    style={{ gridTemplateColumns: "repeat(auto-fit,30rem)" }}>{
                         clearanceResponses
                        .filter((response)=>
                        response.status==="accepted")
                        .sort((a,b)=>{
                           if(a.status==="accepted"){
                              return 1;
                           }
                           else{
                             return -1;
                             
                           }
                        }).map((response) => (
                            <Card key={response.id} style={{ width: "30rem", height: "30rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title  className={`${styles.card_title}`}>Reason: {response.clearanceRequest.requestedReason}</Card.Title>
                                    <div className="d-flex align-items-start">
                                   <StatusBadge text={response.status}></StatusBadge>
                                    </div>
                                    <Card.Text style={{ marginTop: "1em" }} className={`${styles.card_text}`}>
                                        <p><b>Requester Name</b>: {response.clearanceRequest.requestedBy.fname
                                        +" "+response.clearanceRequest.requestedBy.mname}</p>
                                        <p><b>Date</b>: {response.clearanceRequest.requestedDate}</p>
                                        <p><b>Requester Id</b>:{response.clearanceRequest.requestedBy.id}</p>
                                        <p><b>Department</b>: {response.clearanceRequest.requestedBy.department.name}</p>
                                        {
                                        roles.find((role)=>role=="ROLE_PROCTOR")?
                                        (<>
                                        <p><b>Block</b>:{response.clearanceRequest.requestedBy.block.name+"-0"
                                        +response.clearanceRequest.requestedBy.block.blockNo}</p>
                                        </>
                                        ):
                                        (
                                        <>
                                        </>
                                        )
                                        }
                                    </Card.Text>

                                    <Button className={`${styles.btn}`} 
                                    variant="primary" onClick={(e) => {
                                        navigate(`/view_request/${response.id}`)
                                    }}>
                                        More
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>) : <div style={{"marginLeft":"5%","marginTop":"3%"}} >There are no accepted requests</div>}
                </div>
       
    </div>
  );
};

export default Requests;

