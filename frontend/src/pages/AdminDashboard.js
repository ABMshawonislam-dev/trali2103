import React from 'react'
import {Row,Col} from 'rsuite'
import AdminSidebar from '../components/AdminSidebar'
const AdminDashboard = () => {
  return (
    
    <Row className="show-grid" gutter={30}>
    <Col xs={2}>
        <AdminSidebar></AdminSidebar>
    </Col>
    <Col xs={22}>
        <h1>Welcome To Admin Dashboard. Choose an action from right sidebar</h1>
    </Col>
</Row>
  )
}

export default AdminDashboard