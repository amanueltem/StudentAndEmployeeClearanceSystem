
import {Row,Col,Button} from 'react-bootstrap'
import "../../styles/Registration.css";
import ajax from '../../services/fetchService'
import {useState,useEffect} from 'react'
import {useUser} from '../../UserProvider/index'
import {Link} from 'react-router-dom'
import Header from "../header/Header";
const ViewStatus=()=>{
 const user=useUser();
 const [clearanceRequest,setClearanceRequest]=useState('');
 const [responsesData,setResponsesData]=useState('');
 const [responses,setResponses]=useState([]);
 const [step,setStep]=useState(1);
  useEffect(()=>{
     ajax('api/requests/self','GET',user.jwt).
     then((data)=>
     {
     setClearanceRequest(data[0]);
     }
     );
  },[]);
  useEffect(()=>{
  ajax('api/responses','GET',user.jwt).
  then((data)=>
  {
  setResponsesData(data);
  }
  );
  },[]);
  
  useEffect(()=>{
  let copyData=[];
  if(responses.length>0)
    copyData.push(responsesData&&
     responsesData.filter((response)=>response.position==='ROLE_DEPARTMENT_HEAD')[0]);
         copyData.push(responsesData&&
     responsesData.filter((response)=>response.position==='ROLE_LIBRARY')[0]);
     copyData.push(responsesData&&
     responsesData.filter((response)=>response.position==='ROLE_CAFETERIA')[0]);
     copyData.push(responsesData&&
     responsesData.filter((response)=>response.position==='ROLE_PROCTOR')[0]);
     if( clearanceRequest &&clearanceRequest.requestedReason==='"Id Replacement"')
     {
     copyData.push(responsesData&&
     responsesData.filter((response)=>response.position==='ROLE_CAMPUS_POLICE')[0]);
     }
      else if( clearanceRequest &&clearanceRequest.requestedReason==='"Withdrawal"')
     {
    
     copyData.push(responsesData&&
     responsesData.filter((response)=>response.position==='ROLE_COLLEGE_DEAN')[0]);
     }
      copyData.push(responsesData&&
     responsesData.filter((response)=>response.position==='ROLE_REGISTRAR')[0]);
    setResponses(copyData);
  },[responsesData]);
  const RequestFormatter=(col)=>{
   return(
        <Row>
       <Col>
        <label>{col.col1}</label>
        </Col>
        <Col>
        <label>{col.col2}</label>
        </Col>
        </Row>
   )
  };
  
    const ResponseFormatter=(col)=>{
   return(
       <Row>
           <Col>
            <label  className="labelM fullName">{col.col1}</label>
           </Col>
           <Col>
            <label className="labelM">{col.col2}</label>
           </Col>
           <Col>
           <label className="labelM fullName">{col.col3}</label>
           </Col>
           <Col>
           {
           col.col4==="rejected" ?
           <b><label className="labelM" style={{color:'#ff0000'}}>{col.col4}</label></b>
           :
           col.col4==="accepted" ?
            <b><label className="labelM" style={{color:'#00ff00'}}>{col.col4}</label></b>
            :
           <b><label className="labelM">{col.col4}</label></b>
           }
           </Col>
          <Col>
           <Link to={`/view_status/${col.col5}`} style={{ cursor: "pointer"}}>
           <label className="labelM">
            Details
            </label>
           </Link>
          </Col>
         </Row>
   )
  };
  
 const RequestDetails=()=>{
    return(
     <div class="detail">
    
     <RequestFormatter col1="Requester:" col2={clearanceRequest.requestedBy.fname
     +" "+clearanceRequest.requestedBy.mname}/>
     <RequestFormatter col1="Campus:" col2={clearanceRequest.requestedBy.department.college.campus.name}/>
     <RequestFormatter col1="Department:" col2={clearanceRequest.requestedBy.department.name}/>
     <RequestFormatter col1="Reason:" col2={clearanceRequest.requestedReason}/>
     <RequestFormatter col1="Requested Date:" col2={clearanceRequest.requestedDate}/>  
     </div>
    )
 };
 
 
 const ResponseDetails = () => {
    const reason = clearanceRequest.requestedReason;

    if (responses.length > 0) {
        return (
            <div className="detail">
                <Row style={{ backgroundColor: '#ccccff' }}>
                    <Col>
                        <label className="fullName">No</label>
                    </Col>
                    <Col>
                        <label>Staff</label>
                    </Col>
                    <Col>
                        <label class="fullName">Full name</label>
                    </Col>
                    <Col>
                        <label>Status</label>
                    </Col>
                     <Col>
                        <label>Details</label>
                    </Col>
                </Row>

                {responses.map((response, index) => (
                    <ResponseFormatter
                        key={index}
                        col1={index + 1}
                        col2={response.position === 'ROLE_DEPARTMENT_HEAD' ? 'Department Head' :
                            response.position === 'ROLE_LIBRARY' ? 'Library Circulation' :
                            response.position === 'ROLE_CAFETERIA' ? 'Student Cafeteria' :
                            response.position === 'ROLE_PROCTOR' ? 'Proctor' :
                            response.position === 'ROLE_CAMPUS_POLICE' ? 'Campus Police' :
                            response.position === 'ROLE_COLLEGE_DEAN' ? 'College Dean' :
                            'Registrar'}
                        col3={response ? (response.fname + " " + response.mname) : ''}
                        col4={response ? response.status : ''}
                        col5={response? response.id:''}
                    />
                ))}
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

   return (
 <div className="justify-content-center">
        <Header/>
        {
         clearanceRequest ?
         (
          <div>
            { step==1&& (
            <>
            <RequestDetails/>
           
              <Button
              type="button"
               size="lg"
               className="mt-3 me-5"
               onClick={
               (e)=>
               {setStep(step+1);
               }
               }>
                ...More
              </Button>
            </>)
            }
            
            
            {step==2 &&(
            <>
            <ResponseDetails/>
           
               <Button
                 variant="secondary"
                 type="button"
                 size="lg"
                 className="mt-3 me-5"
                 onClick={
                 (e)=>{
                   setStep(step-1);
                 }
                 }
               >
                 Back
               </Button>
          
            </>
            )
            }
          </div>
          ):
          (
          <div>
          You don't have any cleance Request!
          </div>
          )
          }
     
 </div>);
 
 
}
export default ViewStatus;
