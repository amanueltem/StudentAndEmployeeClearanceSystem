
import {Row,Col,Button} from 'react-bootstrap'
import "../../styles/Registration.css";
import "../../styles/table.css";
import ajax from '../../services/fetchService'
import {useState,useEffect,useRef} from 'react'
import {useUser} from '../../UserProvider/index'
import {Link} from 'react-router-dom'
import Header from "../header/Header";
import {useNavigate} from 'react-router-dom'
import Loader from "../../components/Loader";

const ViewStatus=()=>{
 const user=useUser();
 const [clearanceRequest,setClearanceRequest]=useState('');
 const [responsesData,setResponsesData]=useState('');
 const [responses,setResponses]=useState([]);
 const requestId = window.location.href.split("/view_request/")[1];
 const navigate=useNavigate();
   const [isLoading, setIsLoading] = useState(false);
 const responseDetailsRef = useRef();  // Reference for the ResponseDetails component


  useEffect(()=>{
    setIsLoading(true);
        ajax(`/api/requests/${requestId}`,"GET",user.jwt).
        then((data)=>{
           
        setClearanceRequest(data);
        setIsLoading(false)
        });
     },[]);


  useEffect(()=>{
    setIsLoading(true)
  ajax(`/api/responses/details/${requestId}`,'GET',user.jwt).
  then((data)=>
  {
  
   
  setResponsesData(data);
  setIsLoading(false)
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
  

 
 
 const ResponseDetails = () => {
    const reason = clearanceRequest.requestedReason;

    if (responses.length > 0) {
        return (
         <div className="detail" ref={responseDetailsRef}>
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








// This useEffect checks if responseDetailsRef is loaded
useEffect(() => {
    if (responseDetailsRef.current) {
        console.log("Response details component is ready for printing.");
    } else {
        console.warn("Response details ref is not yet assigned.");
    }
}, [responseDetailsRef.current]);


   return (
 <div className="justify-content-center main_table" style={{"marginTop":"8%"}}>
        <Header/>
         {isLoading && <Loader />}
        {
         clearanceRequest ?
         (<>
         <ResponseDetails/>
          <Button size="lg"
        variant="secondary"
        onClick={
        (e)=>{
         navigate(-1);
        }
        }>
        Back
        </Button>

          {
            clearanceRequest.status==='accepted'&&(
           <Button size="lg" variant="success"  style={{ marginLeft: '10px' }}
           onClick={(e)=>{
               navigate(`/print/${requestId}`)
           }}
           >
                        Download
                    </Button>
                    )
                }
        </>
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
