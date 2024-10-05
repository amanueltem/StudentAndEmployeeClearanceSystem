
import {Button, Card  } from 'react-bootstrap';

import ajax from "../../../services/fetchService"
import {useUser} from "../../../UserProvider/index"
import {useEffect,useState} from 'react'
import ViewStaffHeader from "../../header/ViewStaffHeader";
import {useNavigate} from 'react-router-dom'
import styles from "../../../styles/Card.module.scss";
const Library = () => {
const [datas,setDatas]=useState([]);
const user=useUser();
const navigate=useNavigate();
 useEffect(()=>{
  ajax('/api/college_users/librarians','GET',user.jwt).
  then((data)=>setDatas(data));
 },[]);
  return (
    <div>
          <ViewStaffHeader/>
          <h1  style={{"marginLeft":"3rem","margin":"5%"}}>List of Librarians</h1>
          {datas ? (
                <div className={`d-grid gap-5 ${styles.cards}`}
                    style={{ gridTemplateColumns: "repeat(auto-fit,30rem)" }}>{
                        datas.map((data) => (
                            <Card key={data.id} style={{ width: "30rem", height: "30rem" }} className={`${styles.card}`}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title className={`${styles.card_title}`}>{data.college.name}</Card.Title>
                                    
                                    <Card.Text style={{ marginTop: "1em" }}  className={`${styles.card_text}`}>
                                        <p><b>Name</b>: {data.fname
                                        +" "+data.mname}</p>
                                        <p><b>email</b>: {data.email}</p>
                                        <p><b>ID</b>: {data.id}</p>
                                       
                                    </Card.Text>

                                    <Button className={`${styles.btn}`} variant="primary" onClick={(e) => {
                                        navigate(`/view_request/${data.id}`)
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

export default Library;

