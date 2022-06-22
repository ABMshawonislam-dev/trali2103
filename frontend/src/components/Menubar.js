import React, { useEffect,useState,useContext } from 'react'
import { Navbar, Nav, Dropdown,Container,Drawer,List,Button,Message  } from 'rsuite';
import { FaRegUserCircle} from 'react-icons/fa';
import { AiOutlineHeart,AiOutlineShoppingCart} from 'react-icons/ai';
import { BiGitCompare} from 'react-icons/bi';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Store} from '../Store'
const Menubar = () => {

  let [logo,setLogo] = useState({}) 
  const [open, setOpen] = useState(false);
  const {state,dispatch,cartstate,cartdispatch} = useContext(Store)


  const {cart} = cartstate

  console.log(cart.cartItems)

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

  let handleQuantity = (item,quantity)=>{
    cartdispatch({type:'CART_ADD_PRODUCT',payload: {...item,quantity}})
  }
  
  let handleDeleteCart = (item)=>{
    cartdispatch({type:'CART_REMOVE_PRODUCT',payload: item})

  }

  let handleClearCart = ()=>{
    cartdispatch({type:'CLEAR_CART'})
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
              {state.userInfo.isAdmin&&
                <Dropdown.Item>
                  <Link to="/admin">Admin Dashboard</Link>
                </Dropdown.Item>

              }
              <Dropdown.Item>New File</Dropdown.Item>
              <Dropdown.Item>New File with Current Profile</Dropdown.Item>
              <Dropdown.Item>Download As...</Dropdown.Item>
              <Dropdown.Item>Export PDF</Dropdown.Item>
              <Dropdown.Item>Export HTML</Dropdown.Item>
              {state.userInfo.isVendor
              ?
              <Dropdown.Item>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Dropdown.Item>
              :
              <Dropdown.Item>
                 <Link to="/vendor">Become A Vendor</Link>
              </Dropdown.Item>
              }
              <Dropdown.Item onClick={handleLogout}>
                
                <Link to="/dashboard">Logout</Link>
              </Dropdown.Item>
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
      
        
                  <span className='cart' onClick={() => setOpen(true)}>
                    
                    <AiOutlineShoppingCart className='icon'/>
                      <span className='round'>{cart.cartItems.length}</span>
                    </span>
    
            
            </div>
          </Nav>
      
    
  </Navbar>

  <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Cart Items</Drawer.Title>
          <Drawer.Actions>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          {cart.cartItems.length > 0
            ?
              <List>
                {cart.cartItems.map(item=>(
                  <List.Item>
                    <img src={item.image} width="50"/>
                    <h5 style={{display:'inline-block',margin:'0 10px'}}>{item.name}</h5>
                    <h5 style={{display:'inline-block',margin:'0 10px'}}>{item.price}</h5>
                    <h5 style={{display:'inline-block',margin:'0 10px'}}>{item.size}</h5>
                    <h5 style={{display:'inline-block',margin:'0 10px',width:'10px',height:'10px',borderRadius:'50%',background:`#${item.color}`}}></h5>

                    <Button onClick={()=>handleQuantity(item,item.quantity+1)} color="cyan" appearance="primary">+</Button>
                      <h5 style={{display:'inline-block',margin:'0 10px'}}>{item.quantity}</h5>
                    <Button onClick={()=>handleQuantity(item,item.quantity > 1 ? item.quantity-1 : item.quantity)} color="cyan" appearance="primary">-</Button>
                    <Button onClick={()=>handleDeleteCart(item)} style={{margin:'0 10px'}} color="red" appearance="primary">Delete</Button>
                  </List.Item>
                ))}
                <Link to='/cart'>
                  <Button style={{margin:'10px'}} color="cyan" appearance="primary">Go To Cart Page</Button>
                </Link>
                <Button onClick={handleClearCart} style={{margin:'10px'}} color="red" appearance="primary">Clear Cart</Button>
              </List>
            :
            <Message type="info">Cart Is Empty</Message>
          }
          
        </Drawer.Body>
      </Drawer>
  </Container>
  )
}

export default Menubar