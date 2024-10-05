// Avatar.js
import React from 'react';
import { jwtDecode } from "jwt-decode";
import {useUser} from "../UserProvider/index";
const Avatar = () => {
 const user=useUser();
 const decoded_jwt=jwtDecode(user.jwt);
  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'purple',
        color:'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {decoded_jwt.sub.charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;

