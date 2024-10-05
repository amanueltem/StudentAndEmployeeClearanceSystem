
import PrivateRoute from "./PrivateRoute/index"
import {Routes, Route } from 'react-router-dom';
import RegistrarDashboard from './RegistrarDashboard/index'
import RegisterStudent from './RegistrarDashboard/RegisterStudent/index'
import ViewStudent from './RegistrarDashboard/ViewStudent/index'
import StudentDashboard from './StudentDashboard/index'
import ResponseDetail from './StudentDashboard/ViewStatus/ResponseDetail'
import AdminDashboard from './AdminDashboard/index'
import StaffDashboard from './StaffDashboard/index'
import Requests from './StaffDashboard/Requests/index'
import RegisterEmployee from './AdminDashboard/RegisterEmployee/index'
import ViewStaff from './AdminDashboard/ViewStaff/index'
import DepartmentHead from './AdminDashboard/ViewStaff/DepartmentHead/index'
import Library from './AdminDashboard/ViewStaff/CollegeView/Library'
import CollegeDean from './AdminDashboard/ViewStaff/CollegeView/CollegeDean'
import Registrar from './AdminDashboard/ViewStaff/CollegeView/Registrar'
import Cafeteria from './AdminDashboard/ViewStaff/CampusView/Cafeteria'
import Proctor from './AdminDashboard/ViewStaff/CampusView/Proctor'
import CampusPolice from './AdminDashboard/ViewStaff/CampusView/CampusPolice'
import ViewStudents from './AdminDashboard/ViewStudent/index'
import ApplyClearance from './StudentDashboard/ApplyClearance/index'
import ViewStatus from './StudentDashboard/ViewStatus/index'
import RequestView from './StaffDashboard/Requests/RequestView'
import {useEffect,useState } from "react";
import { jwtDecode } from "jwt-decode";
import Login from "./Login/index";
import { useLocalState } from "./util/UseLocalStorage";
import {useUser} from "./UserProvider/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import "./index.css";
import "./HomePage.css";
import LongForm from './RegistrarDashboard/LongForm'

const App = () => {  
      const user=useUser();
      //const [jwt,setJwt]=useLocalState("","jwt");
   const getRoleFromJWT = () => {
   if(user.jwt){
    const decoded_jwt = jwtDecode(user.jwt);
   return decoded_jwt.authorities;
   }
        return [];
}
     const  [roles,setRoles]=useState(getRoleFromJWT());
    
   return (
      <div className="App">
        <Routes>
         
          <Route path="/" element={<Login/>}/>
          <Route path="/test" element={<LongForm/>}/>
          <Route path="/dashboard" element={
             roles.find((role)=>role ==="ROLE_REGISTRAR")?
          (
           <PrivateRoute>
           <RegistrarDashboard/>
           </PrivateRoute>
          )
          :
          (
          roles.find((role)=>role==="ROLE_STUDENT") ?
          (
          <PrivateRoute>
          <StudentDashboard/>
          </PrivateRoute>
          ):
          (
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
           <PrivateRoute>
           <AdminDashboard/>
           </PrivateRoute>
           ):
           (
           <PrivateRoute>
           <StaffDashboard/>
           </PrivateRoute>
           )
          )
          )
          }/>
         
           <Route path="/register" element={
              roles.find((role)=>role ==="ROLE_REGISTRAR")?
          (
           <PrivateRoute>
           <RegisterStudent/>
           </PrivateRoute>
          )
          :
          (
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
           <PrivateRoute>
           <RegisterEmployee/>
           </PrivateRoute>
           ):
           (
          <PrivateRoute>
          
          </PrivateRoute>
          )
          )
          }/>
          
          <Route path="/apply_clearance" element={
          roles.find((role)=>role==="ROLE_STUDENT")?
          (
          <PrivateRoute>
          <ApplyClearance/>
          </PrivateRoute>
          )
           :
          (
          <PrivateRoute>
          
          </PrivateRoute>)
          } />
          
          
          <Route path="/view_status" element={
            roles.find((role)=>role==="ROLE_STUDENT")?
            (
            <PrivateRoute>
            <ViewStatus/>
            </PrivateRoute>
            )
            :
            (
            <PrivateRoute>
            </PrivateRoute>
            )
            }
            />
            
          <Route path="/view_request" element={
          roles.find((role)=>role==="ROLE_DEPARTMENT_HEAD"||
          role==="ROLE_CAFETERIA"||
          role==="ROLE_LIBRARY"||
          role==="ROLE_CAMPUS_POLICE"||
          role==="ROLE_COLLEGE_DEAN"||
          role==="ROLE_PROCTOR"||
          role==="ROLE_REGISTRAR")?
          ( 
          <PrivateRoute>
          <Requests/>
          </PrivateRoute>
          )
          :
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
          <Route path="/view_request/:id" element={
          roles.find((role)=>role==="ROLE_DEPARTMENT_HEAD"||
          role==="ROLE_CAFETERIA"||
          role==="ROLE_LIBRARY"||
          role==="ROLE_CAMPUS_POLICE"||
          role==="ROLE_COLLEGE_DEAN"||
          role==="ROLE_PROCTOR"||
          role==="ROLE_REGISTRAR")?
          ( 
          <PrivateRoute>
          <RequestView/>
          </PrivateRoute>
          )
          :
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
          <Route path="/view_staff" element={
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
          <PrivateRoute>
          <ViewStaff/>
          </PrivateRoute>
          ):
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
           <Route path="/view_staff/departments" element={
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
          <PrivateRoute>
          <DepartmentHead/>
          </PrivateRoute>
          ):
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
           <Route path="/view_staff/librarians" element={
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
          <PrivateRoute>
          <Library/>
          </PrivateRoute>
          ):
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
             <Route path="/view_staff/college_deans" element={
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
          <PrivateRoute>
          <CollegeDean/>
          </PrivateRoute>
          ):
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
            <Route path="/view_staff/registrars" element={
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
          <PrivateRoute>
          <Registrar/>
          </PrivateRoute>
          ):
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
            <Route path="/view_staff/cefeterias" element={
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
          <PrivateRoute>
          <Cafeteria/>
          </PrivateRoute>
          ):
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
             <Route path="/view_staff/proctors" element={
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
          <PrivateRoute>
          <Proctor/>
          </PrivateRoute>
          ):
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
             <Route path="/view_staff/campus_polices" element={
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
          <PrivateRoute>
          <CampusPolice/>
          </PrivateRoute>
          ):
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
                <Route path="/students" element={
          roles.find((role)=>role==="ROLE_REGISTRAR")?
          (
          <PrivateRoute>
          <ViewStudent/>
          </PrivateRoute>
          ):
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
              <Route path="/students/all" element={
          roles.find((role)=>role==="ROLE_ADMIN")?
          (
          <PrivateRoute>
          <ViewStudents/>
          </PrivateRoute>
          ):
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
           <Route path="/view_status/:id" element={
          roles.find((role)=>role==="ROLE_STUDENT")?
          ( 
          <PrivateRoute>
          <ResponseDetail/>
          </PrivateRoute>
          )
          :
          (<PrivateRoute>
          </PrivateRoute>
          )
          }
          />
          
        </Routes>
      </div>
   );
};

export default App;

