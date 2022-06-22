import React from 'react'
import { Link } from 'react-router-dom';
import Nav from 'rsuite/Nav';
const AdminSidebar = () => {
  return (
    <Nav>
    <Nav.Item>
        <Link to="/productupload">Category Upload</Link>    
    </Nav.Item><br/>
    <Nav.Item>
        <Link to="/productupload">Brand Upload</Link>    
    </Nav.Item><br/>
    <Nav.Item>
        <Link to="/proposition">Product Position</Link>    
    </Nav.Item><br/>
    <Nav.Item>Solutions</Nav.Item><br/>
    <Nav.Item>Products</Nav.Item><br/>
    <Nav.Item>About</Nav.Item><br/>
</Nav>
  )
}

export default AdminSidebar