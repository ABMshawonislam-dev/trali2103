import React from 'react'
import { Link } from 'react-router-dom';
import Nav from 'rsuite/Nav';
const SideDashboard = () => {
  return (
    <Nav>
        <Nav.Item>
            <Link to="/productupload">Product Upload</Link>    
        </Nav.Item><br/>
        <Nav.Item>
        <Link to="/storename"> Create Store Name</Link> 
        </Nav.Item><br/>
        <Nav.Item>Solutions</Nav.Item><br/>
        <Nav.Item>Products</Nav.Item><br/>
        <Nav.Item>About</Nav.Item><br/>
    </Nav>
  )
}

export default SideDashboard