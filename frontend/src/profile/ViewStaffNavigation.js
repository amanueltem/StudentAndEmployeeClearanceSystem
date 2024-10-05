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
         <NavLink exact to="/view_staff" activeClassName="active">
          <button>Dashboard</button>
        </NavLink>
      </Col>
       <Col>
         <NavLink exact to="/view_staff/departments" activeClassName="active">
          <button>Department Head</button>
        </NavLink>
      </Col>
       <Col>
         <NavLink exact to="/view_staff/librarians" activeClassName="active">
          <button>Librarians</button>
        </NavLink>
      </Col>
        <Col>
         <NavLink exact to="/view_staff/college_deans" activeClassName="active">
          <button>College Deans</button>
        </NavLink>
      </Col>
       <Col>
         <NavLink exact to="/view_staff/registrars" activeClassName="active">
          <button>Registrars</button>
        </NavLink>
      </Col>
       <Col>
         <NavLink exact to="/view_staff/cefeterias" activeClassName="active">
          <button>Cafeterias</button>
        </NavLink>
      </Col>
       <Col>
         <NavLink exact to="/view_staff/proctors" activeClassName="active">
          <button>Proctors</button>
        </NavLink>
      </Col>
        <Col>
         <NavLink exact to="/view_staff/campus_polices" activeClassName="active">
          <button>Campus Polices</button>
        </NavLink>
      </Col>
      </nav>
    </Row>
    </div>
  );
};

export default Navigation;

