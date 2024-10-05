// Navigation.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import {Row,Col} from 'react-bootstrap'
import {useState} from 'react'
const Navigation = () => {  
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', backgroundColor:'#dddddd'}}>
    <Row>
     <nav>
    <Col>
        <NavLink exact to="/dashboard" activeClassName="active">
          <button>Home</button>
        </NavLink>
      
      </Col> 
      <Col>
         <NavLink exact to="/view_request" activeClassName="active">
          <button>Requests</button>
        </NavLink>
      </Col>
      </nav>
    </Row>
    </div>
  );
};

export default Navigation;

