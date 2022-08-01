import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import {Container,Grid,Row,Col } from 'rsuite';
import { Store } from '../Store'


const ProductDetails = () => {
    const params = useParams()
    let {cartstate,cartdispatch} = useContext(Store)
  const {cart} = cartstate
  console.log(cart.cartItems)


    
    let [product,setProduct] = useState({})
    console.log(product)

    let handleQuantity = (item,quantity)=>{
        cartdispatch({type:'CART_ADD_PRODUCT',payload: {...item,quantity}})
      }

    useEffect(()=>{
       async function details(){

            let {data} = await axios.get(`http://localhost:8000/productdetails/${params.id}`)
            setProduct(data)
        }
        details()
    },[params.id])
  return (
    <Grid>  
            {product &&
                <Row className="show-grid" gutter={30}>
                    <Col xs={12}>
                        <img src="assets/images/productimg.png"/>
                    </Col>
                    <Col xs={12}>
                        <h1>{product.name}</h1>
                        <h1>${product.price}</h1>
                        <h1>{product.descripton}</h1>
                        {cart.cartItems.map(item=>(
                            
                            item._id == params.id &&
                                <>
                                    <h1>{item.name}</h1>
                                <div className='quantity'>
                                    <span onClick={()=>handleQuantity(item,item.quantity > 1 ? item.quantity-1 : item.quantity)} className='operator' >-</span>
                                    <span className='number'>{item.quantity}</span>
                                    <span onClick={()=>handleQuantity(item,item.quantity+1)} className='operator'>+</span>
                                </div>
                                </>
                            
                            
                            
                        ))}
                    </Col>
                </Row>
            }
        </Grid>
  )
}

export default ProductDetails