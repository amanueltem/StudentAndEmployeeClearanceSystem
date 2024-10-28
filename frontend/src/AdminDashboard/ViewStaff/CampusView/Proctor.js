
import {Button, Card  } from 'react-bootstrap';

import ajax from "../../../services/fetchService"
import {useUser} from "../../../UserProvider/index"
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import ViewStaffHeader from "../../header/ViewStaffHeader"
import styles from "../../../styles/Card.module.scss";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
const Proctor = () => {
const [datas,setDatas]=useState([]);
const user=useUser();
const navigate=useNavigate();
 useEffect(()=>{
  ajax('/api/proctors','GET',user.jwt).
  then((data)=>setDatas(data));
 },[]);



 const handleDelete = (staffId) => {
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
      ajax(`/api/proctors/${staffId}`, 'delete', user.jwt).then((data)=>{
         const datasCopy = [...datas];
      const i = datasCopy.findIndex(data => data.id === staffId);
      datasCopy.splice(i, 1);
      setDatas(datasCopy);

      Swal.fire(
        'Deleted!',
        'The staff has been deleted.',
        'success'
      );
      }).catch((err)=>{
        toast.error("not sucessfuly deleted.")
      });
     
    }
  });
};


  return (
    <div>
         <ViewStaffHeader/>
          <h1 style={{"marginLeft":"3rem","margin":"5%"}}>List of Proctors</h1>
            {datas ? (
                <div className={`d-grid gap-5 ${styles.cards}`}
                    style={{ gridTemplateColumns: "repeat(auto-fit,30rem)" }}>{
                        datas.map((data) => (
                            <Card key={data.id} style={{ width: "30rem", height: "30rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title  className={`${styles.card_title}`}>{data.block.name+"-0"+data.block.blockNo}</Card.Title>
                                    
                                    <Card.Text Sstyle={{ marginTop: "1em" }}
                                        className={`${styles.card_text}`}>
                                        <p><b>Name</b>: {data.fname
                                        +" "+data.mname}</p>
                                        <p><b>email</b>: {data.account.email}</p>
                                        <p><b>ID</b>: {data.account.username}</p>
                                       <p><b>Campus</b>:{data.block.campus.name}</p>
                                    </Card.Text>

                                    <Button   className={`${styles.btn}`}
                                    variant="primary" onClick={(e) => {
                                       navigate(`/update_college_staff/${data.id}`);
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

export default Proctor;

