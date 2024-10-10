import {useLocalState} from "../util/UseLocalStorage";
import {useState} from 'react'
import {Container,Row,Col,Button,Form} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import {useUser} from "../UserProvider/index";

import loginImg from "../images/login.png";
import styles from "./auth.module.scss";
import Card from "../components/Card";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
const Login=()=>{
 const user=useUser();
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('');
    const [isLoading, setIsLoading] = useState(false);
      
  const navigate=useNavigate();
   const sendLoginRequest=()=>{
  setIsLoading(true);
  if(username===null|| username==="" || password===null || password===""){
    toast.error("Invalid login attempt");
    setIsLoading(false);
    return;
  }
    const reqBody={
   username:username,
   password:password,
  }
     fetch("/api/auth/login",{
   headers:{
      "Content-Type":"application/json"
   },
   method:"POST",
   body:JSON.stringify(reqBody),
  })
  .then((response)=>{
           if(response.status===200){
           
              return Promise.all([response.json(),response.headers])
               
      
           }
           else  return Promise.reject("Invalid login attempt")
  })
  .then(([body,headers])=>{
   user.setJwt(headers.get("authorization"))
     toast.success("Login Successful...");
    setIsLoading(false);
   window.location.href="/dashboard";
   //navigate("/dashboard");
  }).catch((error)=>{
  console.log("Hello");
    toast.error(error.message|| "Invalid login attempt");
        setIsLoading(false);
      
  })
   }
   return( 
     <>
       {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form>
              <input
                type="text"
                placeholder="User Name"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="--btn --btn-primary --btn-block"
                onClick={sendLoginRequest}>
                Login
              </button>
              <div className={styles.links}>
                <Link to="/forgot_password">Forget Password</Link>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
          )
}
export default Login;
