import React,{useState,useContext} from 'react'
import {Form,ButtonToolbar,Button} from 'rsuite'
import {Store} from '../Store'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate()

    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")

    const {state,dispatch} = useContext(Store)

 let handleSubmit = async ()=>{
    const {data} = await  axios.post("http://localhost:8000/login",{
         email: email,
         password: password
     })
     dispatch({type:'USER_LOGIN',payload: data.data})
     localStorage.setItem('userInfo',JSON.stringify(data.data))
     navigate('/')
 }


  return (
    <div className='container'>
    <div className='regbox'>
    <Form>
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
<Form.HelpText>Don't Have An Account? <Link to="/registration">Registration</Link></Form.HelpText>
</Form>
    </div>
</div>
  )
}

export default Login