import React, { useContext, useEffect, useState } from 'react'
import SideDashboard from '../components/SideDashboard'
import {Row,Col,Form,ButtonToolbar,Button,Panel,Modal} from 'rsuite'
import axios from 'axios'
import { Store } from '../Store'
const Storename = () => {

    let {state} = useContext(Store)
    console.log(state)
    let [storename,setStorename] = useState('')
    let [store,setStore] = useState('')
    let [storedetails,setStoredetails] = useState({})
    const [open, setOpen] = useState(false);

    let handleStoreName = async ()=>{
        console.log("ami")

        let {data} = await axios.post('http://localhost:8000/storename',{
            storename: storename,
            owner: state.userInfo._id,
            ownername: state.userInfo.name
        })
        console.log(data)
    }

    let handleEdit = ()=>{
        console.log("click")
        setOpen(true)
    }

    let handleclose = ()=>{
        setOpen(false)
    }

    let handleStoreNameEdit = async () => {
        
        let {data} = await axios.put('http://localhost:8000/storename',{
            storename: storename,
            id: storedetails._id
        })
        console.log(data)
    }

    let handleStoreDelete = async () => {
        console.log("delete")
        let {data} = await axios.delete(`http://localhost:8000/storename/${storedetails._id}`)
        console.log(data)
    }


    useEffect(()=>{
       async function store(){
            let {data} = await axios.get(`http://localhost:8000/storename/${state.userInfo._id}`)
            setStore(data[0].storename)
            setStoredetails(data[0])
        }
        store()
    },[])

  return (
    <Row className="show-grid" gutter={30}>
    <Col xs={2}>
        <SideDashboard></SideDashboard>
    </Col>
    <Col xs={22}>
        {store
        ?
        <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
        <img src="https://via.placeholder.com/240x240" height="240" />
        <Panel header={store}>
         
          <Button color="blue" appearance="primary" onClick={handleEdit}>Edit</Button>
          <Button color="violet" appearance="primary" onClick={handleStoreDelete}>Delete</Button>
        </Panel>
      </Panel>
        :
        <Form fluid>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Store Name</Form.ControlLabel>
        <Form.Control onChange={(e)=> setStorename(e)} type="text" name="name" placeholder='Store Name'/>
        </Form.Group>
        
        
        <Form.Group>
        <ButtonToolbar>
            <Button onClick={handleStoreName} appearance="primary">Submit</Button>
        </ButtonToolbar>
        </Form.Group>
    </Form>
        }
        
    </Col>

    <Modal open={open} >
        <Modal.Header>
          <Modal.Title>Edit Store Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form fluid>
        <Form.Group controlId="name-1">
        <Form.ControlLabel>Store Name</Form.ControlLabel>
        <Form.Control onChange={(e)=> setStorename(e)} type="text" name="name" placeholder='Store Name'/>
        </Form.Group>
        
        
        <Form.Group>
        </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleStoreNameEdit} appearance="primary">
            Change Name
          </Button>
          <Button onClick={handleclose} appearance="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
</Row>
  )
}

export default Storename