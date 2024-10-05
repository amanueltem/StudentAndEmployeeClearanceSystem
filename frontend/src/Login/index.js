import {useLocalState} from "../util/UseLocalStorage";
import {useState} from 'react'
import {Container,Row,Col,Button,Form} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import {useUser} from "../UserProvider/index";
import NavHeader from "../profile/NavHeader"
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import loginImg from "../images/login.png";
import styles from "./auth.module.scss";
import Card from "../components/Card";
const Login=()=>{
 const user=useUser();
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('');
    const [isLoading, setIsLoading] = useState(false);
    
  const navigate=useNavigate();
   const sendLoginRequest=()=>{
   console.log("This is for test.");
     setIsLoading(false);
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
   window.location.href="/dashboard";
   //navigate("/dashboard");
  }).catch((message)=>alert(message))
   }
   return( 
     <>
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
                <Link to="/reset">Reset Password</Link>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
          )
}
export default Login;
