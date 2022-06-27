import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {Grid,Row,Col,Message,Input,Button} from 'rsuite'
import { Store } from '../Store'

const Cart = () => {

  let {cartstate,cartdispatch} = useContext(Store)
  const {cart} = cartstate
  console.log(cart.cartItems)

  let [total,setTotal] = useState('')
  let [shipping,setShipping] = useState(50)
  let [cupon,setCupon] = useState('')
  let [discount,setDiscount] = useState('')

  let handleQuantity = (item,quantity)=>{
    cartdispatch({type:'CART_ADD_PRODUCT',payload: {...item,quantity}})
  }

  let handleDeleteCart = (item)=>{
    cartdispatch({type:'CART_REMOVE_PRODUCT',payload: item})
  }

  let handleCupon = async ()=>{
      let {data} = await axios.get(`http://localhost:8000/cupon/${cupon}`)
      setDiscount(data[0].discountamount)
      console.log(data)
  }

  useEffect(()=>{
    let price =0
    cart.cartItems.map(item=>{
      price += item.price * item.quantity
    })
    setTotal(price)
    if(price>=300){
      setShipping(30)
    }else if(price>=200){
      setShipping(40)
      
    }else{
      setShipping(50)
      
    }
  },[cart.cartItems])

  return (
    <div className='container'>
        <div className='cartpage'>
            <h1>Cart Page</h1>
            <Message showIcon type="error" header="For Your Kind Information">
              Cart Is Empty
           </Message>
            <Grid fluid>
              <Row className="show-grid">
                <Col xs={16}>
                 <Grid fluid>
                  <Row className="show-grid">
                    <Col xs={11}>
                      <h6>Item</h6>
                    </Col>
                    <Col xs={3}>
                      <h6>Price</h6>
                    </Col>
                    <Col xs={5}>
                      <h6>Quantity</h6>
                    </Col>
                    <Col xs={4}>
                      <h6>Subtotal</h6>
                    </Col>
                    <Col xs={1}></Col>
                  </Row>

                  {cart.cartItems.map(item=>(
                    <Row className="show-grid" style={{marginTop: '31px',paddingBottom:'16px'}}>
                        <Col xs={11}>
                          <div className='box'>
                              <div className='img'>
                                <img src={item.image} width="124px"/>
                              </div>
                              <div className='details' style={{marginLeft: '10px'}}>
                                <p >{item.brand}</p>
                                <h4 >{item.name}</h4>
                                <h5 >Color: <span style={{display:'inline-block',width:'16px',height:'16px',borderRadius:'50%',background:`#${item.color}`}}></span></h5>
                                <h5 >Size: {item.size}</h5>
                              </div>
                          </div>
                        </Col>
                        <Col xs={3}>
                          <h3>${item.price}</h3>
                        </Col>
                        <Col xs={5}>
                          <div className='quantity'>
                            <span onClick={()=>handleQuantity(item,item.quantity > 1 ? item.quantity-1 : item.quantity)} className='operator' >-</span>
                            <span className='number'>{item.quantity}</span>
                            <span onClick={()=>handleQuantity(item,item.quantity+1)} className='operator'>+</span>
                          </div>
                        </Col>
                        <Col xs={4}>
                          <h3>${item.price * item.quantity}</h3>
                        </Col>
                        <Col xs={1}>
                          <h3 className='delete' onClick={()=>handleDeleteCart(item)}>x</h3>
                        </Col>
                    </Row>
                  ))}

                  <div className='cupon'>
                    <h2>Coupon Discount</h2>
                    <Input onChange={(e)=> setCupon(e)} placeholder="Enter your Cupon Code Here" />
                    <Button onClick={handleCupon} color="orange" appearance="primary">Submit</Button>
                  </div>
                </Grid>
                </Col>
                <Col xs={8}>
                  <div className='shipping'>
                      <h3>SHIPPING</h3>
                      <Input placeholder="State" />
                      <Input placeholder="Address" />
                      <Input placeholder="phone number" />

                      <div className='box'>
                        <div className='left'>
                          <h5>Subtotal</h5>
                        </div>
                        <div className='right'>${total}</div>
                      </div>
                      <div className='box'>
                        <div className='left'>
                          <h5>Shipping</h5>
                        </div>
                        <div className='right'>${shipping}</div>
                      </div>
                      <div className='box'>
                        <div className='left'>
                          <h3>Order Total</h3>
                        </div>
                        <div className='right'>
                          <h3>{discount?total+shipping-(((total+shipping)*discount)/100):total+shipping}</h3>
                        </div>
                      </div>

                      <Button block color="violet" appearance="primary">Procesed to Checkout</Button>
                  </div>
                </Col>
              </Row>
            </Grid>
        </div>
    </div>
  )
}

export default Cart