import axios from 'axios'
import React, { useState } from 'react'
import {Row,Col,Form,ButtonToolbar,Button} from 'rsuite'
import AdminSidebar from '../components/AdminSidebar'
const ProductPosition = () => {

    let [name,setName] = useState('')

    let handleSubmit = async ()=>{
        let {data} = await axios.post('http://localhost:8000/productposition',{
            name: name,
            value: name
        })
        console.log(data)
    }

  return (
    <Row className="show-grid" gutter={30}>
    <Col xs={2}>
        <AdminSidebar></AdminSidebar>
    </Col>
    <Col xs={22}>
    <Form fluid>
    <Form.Group controlId="name-1">
      <Form.ControlLabel>Position</Form.ControlLabel>
      <Form.Control onChange={(e)=>setName(e)} name="name" />
    </Form.Group>
      <ButtonToolbar>
        <Button onClick={handleSubmit} appearance="primary">Submit</Button>
        <Button appearance="default">Cancel</Button>
      </ButtonToolbar>
   
  </Form>
    </Col>
</Row>
  )
}

export default ProductPosition