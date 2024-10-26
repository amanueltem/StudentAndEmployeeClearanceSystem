import Navigation from '../../profile/RegistrarNavigation';
import { Row, Col,Button, Card  } from 'react-bootstrap';
import Header from "../../RegistrarDashboard/header/Header";
import styles from "../../styles/Card.module.scss";
import {useEffect,useState} from 'react'
import {useUser} from "../../UserProvider/index"
import {useNavigate} from 'react-router-dom'
import ajax from "../../services/fetchService"
import Swal from 'sweetalert2';
const ViewStudent = () => {
const user=useUser();
const [datas,setDatas]=useState([]);
const navigate=useNavigate();
useEffect(()=>{
  ajax('/api/students','GET',user.jwt)
  .then((data)=>{setDatas(data);
  console.log(data);});
},[]);


const handleDelete = (studentId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "This student will be permanently deleted!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      ajax(`/api/students/${studentId}`, 'delete', user.jwt);
      const datasCopy = [...datas];
      const i = datasCopy.findIndex(data => data.id === studentId);
      datasCopy.splice(i, 1);
      setDatas(datasCopy);

      Swal.fire(
        'Deleted!',
        'The student has been deleted.',
        'success'
      );
    }
  });
};

const handleUpdate=()=>{
  alert("Update Student");
}


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
                                       navigate(`/update_student/${data.id}`);
                                    }}>
                                        More
                                    </Button>
                                       <Button   className={`${styles.btn}`}
                                    variant="danger" onClick={(e)=>{
                                    handleDelete(data.id);
                                    }}>
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                </div>) : <></>}
     
    </div>
  );
};

export default ViewStudent;

