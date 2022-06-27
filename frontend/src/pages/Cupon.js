import React, { useState } from 'react'
import {Row,Col,Button,Input} from 'rsuite'
import SideDashboard from '../components/SideDashboard'
import axios from 'axios'
const Cupon = () => {

    let [cuponname,setCuponname] = useState('')
    let [discountamount,setDiscountamount] = useState('')

    let handleCupon = async ()=>{
        let {data} = await axios.post('http://localhost:8000/cupon',{
            cuponname: cuponname,
            discountamount: discountamount,
        })
    }

  return (
    <Row className="show-grid" gutter={30}>
        <Col xs={2}>
            <SideDashboard></SideDashboard>
        </Col>
        <Col xs={22}>
            <Input onChange={(e)=> setCuponname(e)} placeholder="Cupon Name" />
            <Input onChange={(e)=> setDiscountamount(e)} placeholder="Discount Amount" />
            <Button onClick={handleCupon} color="green" appearance="primary">Submit</Button>
        </Col>
    </Row>
  )
}

export default Cupon