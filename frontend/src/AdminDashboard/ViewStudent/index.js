import Navigation from '../../profile/AdminNavigation';
import { Button, Card  } from 'react-bootstrap';
import ajax from "../../services/fetchService"
import {useUser} from "../../UserProvider/index"
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from "../header/Header";
import styles from "../../styles/Card.module.scss";
const ViewStudent = () => {
const [datas,setDatas]=useState([]);
const user=useUser();
const navigate=useNavigate();
 useEffect(()=>{
  ajax('/api/students/all','GET',user.jwt).
  then((data)=>setDatas(data));
 },[]);

  return (
    <div>
        <Header/>
          <h1 style={{"marginLeft":"3rem","margin":"5%"}}>List of Students</h1>
           {datas ? (
                <div  className={`d-grid gap-5 ${styles.cards}`}
                    style={{ gridTemplateColumns: "repeat(auto-fit,30rem)" }}>{
                        datas.map((data) => (
                            <Card key={data.id} style={{ width: "30rem", height: "30rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title className={`${styles.card_title}`}>{data.department.name}</Card.Title>
                                    
                                    <Card.Text Sstyle={{ marginTop: "1em" }} className={`${styles.card_text}`}>
                                        <p><b>Name</b>: {data.fname
                                        +" "+data.mname}</p>
                                        <p><b>email</b>: {data.email}</p>
                                        <p><b>ID</b>: {data.id}</p>
                                       
                                    </Card.Text>

                                    <Button className={`${styles.btn}`} 
                                         variant="primary" onClick={(e) => {
                                        navigate(`/view_student/${data.id}`)
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

