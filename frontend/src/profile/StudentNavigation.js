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
         <NavLink exact to="/apply_clearance" activeClassName="active">
          <button>Apply Clearance</button>
        </NavLink>
      </Col>
        <Col>
         <NavLink exact to="/view_status" activeClassName="active">
          <button>View Status</button>
        </NavLink>
      </Col>
      </nav>
    </Row>
    </div>
  );
};

export default Navigation;

