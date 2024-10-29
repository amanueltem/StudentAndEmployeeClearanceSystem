
import {Button, Card  } from 'react-bootstrap';

import ajax from "../../../services/fetchService"
import {useUser} from "../../../UserProvider/index"
import {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import ViewStaffHeader from "../../header/ViewStaffHeader";
import styles from "../../../styles/Card2.module.scss";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
const DepartmentHead = () => {
const [datas,setDatas]=useState([]);
const user=useUser();
const navigate=useNavigate();
 useEffect(()=>{
  ajax('/api/dept_users/department_heads','GET',user.jwt).
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
      ajax(`/api/dept_users/${staffId}`, 'delete', user.jwt).then((data)=>{
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
         <h1 className={styles.registrarTitle}>List of Department Heads</h1>
           {datas ? (
                <div  className={`d-grid gap-5 ${styles.cards}`}
                    style={{ gridTemplateColumns: "repeat(auto-fit,30rem)" }}>{
                        datas.map((data) => (
                            <Card key={data.id} style={{ width: "30rem", height: "30rem" }} className={`${styles.card}`}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title className={`${styles.card_title}`}>{data.department.name}</Card.Title>
                                    
                                    <Card.Text Sstyle={{ marginTop: "1em" }} className={`${styles.card_text}`}>
                                        <p><b>Name</b>: {data.fname
                                        +" "+data.mname}</p>
                                        <p><b>email</b>: {data.account.email}</p>
                                        <p><b>ID</b>: {data.account.username}</p>
                                       <p><b>Campus</b>:{data.department.college.campus.name}</p>
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

export default DepartmentHead;

