import React, { useEffect,useState,useContext } from 'react'
import { Navbar, Nav, Dropdown,Container  } from 'rsuite';
import { FaRegUserCircle} from 'react-icons/fa';
import { AiOutlineHeart,AiOutlineShoppingCart} from 'react-icons/ai';
import { BiGitCompare} from 'react-icons/bi';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Store} from '../Store'
const Menubar = () => {

  let [logo,setLogo] = useState({}) 
  const {state,dispatch} = useContext(Store)

  console.log("ami Store theke aseci",state)

  useEffect(()=>{
    async function menu(){
      let data = await axios.get("http://localhost:8000/logo")
      setLogo(data.data.img) 
    }   
    menu()
  },[])

  let handleLogout = ()=>{
    console.log("logout")
    dispatch({type:'USER_LOGOUT'})
    localStorage.removeItem('userInfo')
  }

  return (
    <Container className='container'>
    <Navbar className='menu'>
     

            <Navbar.Brand href="#">
                <img src={logo}/>
                
            </Navbar.Brand>
          <Nav className='menu-item'>
            <Nav.Item >Home</Nav.Item>
            <Nav.Item>Pages</Nav.Item>
            <Nav.Item>Blog</Nav.Item>
            <Nav.Item>Contacts</Nav.Item>
            {/* <Nav.Item>
            <Link to="/registration">
              Signup / Signin
            </Link>
            </Nav.Item> */}

            {state.userInfo
            ?
            <Dropdown title={state.userInfo.name}>
              <Dropdown.Item>New File</Dropdown.Item>
              <Dropdown.Item>New File with Current Profile</Dropdown.Item>
              <Dropdown.Item>Download As...</Dropdown.Item>
              <Dropdown.Item>Export PDF</Dropdown.Item>
              <Dropdown.Item>Export HTML</Dropdown.Item>
              <Dropdown.Item>Become A Vendor</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
            // <Nav.Item>{state.userInfo.name}</Nav.Item>
            :
            <Nav.Item>
            <Link to="/registration">
              Signup / Signin
            </Link>
            </Nav.Item>
            }
           
          </Nav>
          <Nav pullRight>
            <div className='navicon'>

            <FaRegUserCircle className='icon'/>
            <AiOutlineHeart className='icon'/>
            <BiGitCompare className='icon'/>
            <span className='cart'>
            <AiOutlineShoppingCart className='icon'/>
              <span className='round'>15</span>
            </span>
            </div>
          </Nav>
      
    
  </Navbar>
  </Container>
  )
}

export default Menubar