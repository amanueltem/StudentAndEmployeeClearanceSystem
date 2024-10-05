import Navigation from '../../profile/RegistrarNavigation';
import { Row, Col,Button, Card  } from 'react-bootstrap';
import Header from "../../RegistrarDashboard/header/Header";
import styles from "../../styles/Card.module.scss";
import {useEffect,useState} from 'react'
import {useUser} from "../../UserProvider/index"
import {useNavigate} from 'react-router-dom'
import ajax from "../../services/fetchService"
const ViewStudent = () => {
const user=useUser();
const [datas,setDatas]=useState([]);
const navigate=useNavigate();
useEffect(()=>{
  ajax('/api/students','GET',user.jwt)
  .then((data)=>setDatas(data));
},[]);
  return (
    <div>
         <Header/>
          <h1 style={{paddingLeft:"40%",paddingTop:"5%",fontSize:"4rem"}}>List of Students</h1>
          {datas ? (
                <div className={`d-grid gap-5 ${styles.cards}`}
                    style={{ gridTemplateColumns: "repeat(auto-fit,30rem)" }}>{
                        datas.map((data) => (
                            <Card key={data.id} style={{ width: "30rem", height: "30rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title className={`${styles.card_title}`}>{data.department.name}</Card.Title>
                                    
                                    <Card.Text Sstyle={{ marginTop: "1em" }}  className={`${styles.card_text}`}>
                                        <p><b>Name</b>: {data.fname
                                        +" "+data.mname}</p>
                                        <p><b>email</b>: {data.email}</p>
                                        <p><b>ID</b>: {data.id}</p>
                                       <p><b>Year</b>:{data.year}</p>
                                       <p><b>Semister</b>:{data.semister}</p>
                                    </Card.Text>

                                    <Button   className={`${styles.btn}`}
                                    variant="primary" onClick={(e) => {
                                       
                                    }}>
                                        More
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>) : <></>}
     
    </div>
  );
};

export default ViewStudent;

