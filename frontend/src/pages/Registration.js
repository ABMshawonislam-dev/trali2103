import axios from 'axios'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {Form,ButtonToolbar,Button} from 'rsuite'
const Registration = () => {
    const [name,setName]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")

 let handleSubmit = async ()=>{
    const {data} = await axios.post("http://localhost:8000/registration",{
         name: name,
         email: email,
         password: password
     })

     console.log(data)
 }

  return (
    <div className='container'>
        <div className='regbox'>
        <Form>
    <Form.Group controlId="name">
      <Form.ControlLabel>Username</Form.ControlLabel>
      <Form.Control name="name" onChange={(e)=>setName(e)}/>
    </Form.Group>
    <Form.Group controlId="email">
      <Form.ControlLabel>Email</Form.ControlLabel>
      <Form.Control name="email" type="email" onChange={(e)=>setEmail(e)}/>
      
    </Form.Group>
    <Form.Group controlId="password">
      <Form.ControlLabel>Password</Form.ControlLabel>
      <Form.Control name="password" type="password" autoComplete="off" onChange={(e)=>setPassword(e)}/>
    </Form.Group>
    <Form.Group>
      <ButtonToolbar>
        <Button appearance="primary" onClick={handleSubmit}>Submit</Button>
      </ButtonToolbar>
    </Form.Group>
    <Form.HelpText>Don't Have An Account? <Link to="/login">Login</Link></Form.HelpText>
  </Form>
        </div>
    </div>
  )
}

export default Registration