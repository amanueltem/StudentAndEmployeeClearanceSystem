
import {Button, Card  } from 'react-bootstrap';

import ajax from "../../../services/fetchService"
import {useUser} from "../../../UserProvider/index"
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import ViewStaffHeader from "../../header/ViewStaffHeader"
import styles from "../../../styles/Card.module.scss";
import Loader from "../../../components/Loader";
const Registrar = () => {
const [datas,setDatas]=useState([]);
const user=useUser();
const navigate=useNavigate();
 const [isLoading, setIsLoading] = useState(false);
 useEffect(()=>{
    setIsLoading(true)
  ajax('/api/college_users/registrars','GET',user.jwt).
  then((data)=>{
    setIsLoading(false)
    setDatas(data)
});
 },[]);
  return (
    <div>
            {isLoading && <Loader />}
         <ViewStaffHeader/>
          <h1 style={{"marginLeft":"3rem","margin":"5%"}}>List of Registrars</h1>
          {datas ? (
                <div className={`d-grid gap-5 ${styles.cards}`}
                    style={{ gridTemplateColumns: "repeat(auto-fit,30rem)" }}>{
                        datas.map((data) => (
                            <Card key={data.id} style={{ width: "30rem", height: "30rem" }} className={`${styles.card}`}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title className={`${styles.card_title}`}>{data.college.name}</Card.Title>
                                    
                                    <Card.Text Sstyle={{ marginTop: "1em" }}  className={`${styles.card_text}`}>
                                        <p><b>Name</b>: {data.fname
                                        +" "+data.mname}</p>
                                        <p><b>email</b>: {data.account.email}</p>
                                        <p><b>ID</b>: {data.account.username}</p>
                                       
                                    </Card.Text>

                                    <Button className={`${styles.btn}`}  variant="primary" onClick={(e) => {
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

export default Registrar;

