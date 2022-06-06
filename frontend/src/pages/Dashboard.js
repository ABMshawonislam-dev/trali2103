import React from 'react'
import SideDashboard from '../components/SideDashboard'
import {Row,Col} from 'rsuite'

const Dashboard = () => {
  return (
    

    <Row className="show-grid" gutter={30}>
    <Col xs={2}>
        <SideDashboard></SideDashboard>
    </Col>
    <Col xs={22}>
        <h1>Welcome To Dashboard. Choose an action from right sidebar</h1>
    </Col>
</Row>
  )
}

export default Dashboard