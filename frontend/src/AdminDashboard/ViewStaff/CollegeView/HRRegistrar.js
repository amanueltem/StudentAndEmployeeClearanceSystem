
import {Button, Card  } from 'react-bootstrap';

import ajax from "../../../services/fetchService"
import {useUser} from "../../../UserProvider/index"
import {useEffect,useState} from 'react'
import ViewStaffHeader from "../../header/ViewStaffHeader";
import {useNavigate} from 'react-router-dom'
// import styles from "../../../styles/Card.module.scss";
import styles from "../../../styles/Card2.module.scss";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const HRRegistrar = () => {
const [datas,setDatas]=useState([]);
const user=useUser();
const navigate=useNavigate();
const [isLoading, setIsLoading] = useState(false);
 useEffect(()=>{
    setIsLoading(false);
  ajax('/api/college_users/hr','GET',user.jwt).
  then((data)=>{setDatas(data);
    setIsLoading(true);
});
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
      ajax(`/api/college_users/${staffId}`, 'delete', user.jwt).then((data)=>{
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
           {isLoading && <Loader />}
          <h1 className={styles.registrarTitle}>List of  HR</h1>
          {datas ? (
                <div>
                <h1>Hello world</h1>
                </div>) : <></>}
      
    </div>
  );
};

export default HRRegistrar;

