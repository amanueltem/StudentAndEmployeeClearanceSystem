import {useLocalState} from "../util/UseLocalStorage";
import ajax from "../services/fetchService"
import {Navigate} from "react-router-dom";
import {useState} from "react"
import {useUser} from "../UserProvider/index"
import Loader from "../components/Loader";


const LessPrivate=({children})=>{
console.log("\n\n\n cleara clear clear");
   const user=useUser();
 
  const[isValid,setIsValid]=useState(false);
  const[isLoading,setIsLoading]=useState(true);

  if(user){
  ajax(`/api/auth/validate?token=${user.jwt}`,"get",user.jwt)
  .then((isValidated)=>
  {
  setIsLoading(false);
  setIsValid(isValidated);
  });
  }
  else{
  setIsValid(false);
   return <Navigate to="/"/>
}
 return  isLoading ? (
   <Loader/>

 )
 :(isValid ?  children : <Navigate to="/"/>)
}
export default LessPrivate;
