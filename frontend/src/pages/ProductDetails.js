import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import {Container,Grid,Row,Col,Button } from 'rsuite';
import { Store } from '../Store'
import Product from '../components/Product'


const ProductDetails = () => {
    const params = useParams()
    let {cartstate,cartdispatch} = useContext(Store)
  const {cart} = cartstate
  console.log(cart.cartItems)


    
    let [product,setProduct] = useState({}) 
    let [selected,setSelected] = useState("red") 
    let [related,setRelated] = useState([]) 
    

    let handleQuantity = (item,quantity)=>{
        cartdispatch({type:'CART_ADD_PRODUCT',payload: {...item,quantity}})
      }

    useEffect(()=>{
       async function details(){

            let {data} = await axios.get(`http://localhost:8000/productdetails/${params.id}`)
            let related = await axios.get(`http://localhost:8000/productdetails/related/${data.brand}`)
            setRelated(related.data)
            setProduct(data)
        }
        details()
    },[params.id])

    let handleSelected = (select)=>{
        setSelected(select)
    }

  return (
    <div className='productDetails'>
        <Grid>  
            {product &&
                <Row className="show-grid" gutter={30}>
                    <Col xs={12}>
<<<<<<< HEAD
                        <img src="assets/images/productimg.png"/>
=======
                        <img width="100%" src={`/${product.image}`}/>
>>>>>>> cbc136880c4ab6f8ab3fb601295d4a8cf447ce65
                    </Col>
                    <Col xs={12}>
                        <h1>{product.name}</h1>
                        <h6>${product.price}</h6>
                        <p dangerouslySetInnerHTML={{__html: product.descripton}}></p>
                        {cart.cartItems.map(item=>(
                            
                            item._id == params.id &&
                                <>
                                    <h1>{item.name}</h1>
                                <div className='quantity'>
                                    <span onClick={()=>handleQuantity(item,item.quantity > 1 ? item.quantity-1 : item.quantity)} className='operator' >-</span>
                                    <span className='number'>{item.quantity}</span>
                                    <span onClick={()=>handleQuantity(item,item.quantity+1)} className='operator'>+</span>
                                </div>
                                <h1 style={{marginTop:'50px'}}>{item.quantity*item.price}</h1>
                                </>
                            
                            
                            
                        ))}
                    </Col>
                    <Col xs={24}>
                    <Button onClick={()=>handleSelected('red')} style={{borderBottom: selected == 'red' && '5px solid black'}} color="red" appearance="primary">Red</Button>
                    <Button style={{borderBottom: selected == 'orange' && '5px solid black'}} onClick={()=>handleSelected('orange')} color="orange" appearance="primary">Orange</Button>
                    <Button style={{borderBottom: selected == 'yellow' && '5px solid black'}} onClick={()=>handleSelected('yellow')} color="yellow" appearance="primary">Yellow</Button>
                    
                    {selected == 'red' &&
                        <h1>RED Praesent nec fermentum ipsum. Etiam turpis neque, laoreet quis placerat vel, faucibus non tortor. Quisque ut augue et augue consequat blandit nec vel leo. Donec aliquam mauris vel ultrices viverra. Donec pulvinar et odio eget commodo. Maecenas massa odio, tincidunt vitae erat sed, sodales malesuada nisl. Sed consequat libero enim, sed porttitor tortor lacinia et. Donec gravida luctus purus a semper. Fusce id tincidunt eros. Vestibulum sit amet nunc id lorem vestibulum euismod id vitae tortor. Pellentesque ac consectetur dui. Aenean nec maximus neque. Nulla facilisi. Vivamus non ex sodales, malesuada mi ac, pulvinar nibh.</h1>
                    }
                    {selected == 'orange' &&
                        <h1>Ornage Praesent nec fermentum ipsum. Etiam turpis neque, laoreet quis placerat vel, faucibus non tortor. Quisque ut augue et augue consequat blandit nec vel leo. Donec aliquam mauris vel ultrices viverra. Donec pulvinar et odio eget commodo. Maecenas massa odio, tincidunt vitae erat sed, sodales malesuada nisl. Sed consequat libero enim, sed porttitor tortor lacinia et. Donec gravida luctus purus a semper. Fusce id tincidunt eros. Vestibulum sit amet nunc id lorem vestibulum euismod id vitae tortor. Pellentesque ac consectetur dui. Aenean nec maximus neque. Nulla facilisi. Vivamus non ex sodales, malesuada mi ac, pulvinar nibh.</h1>
                    }
                    {selected == 'yellow' &&
                        <h1>YELLOW Praesent nec fermentum ipsum. Etiam turpis neque, laoreet quis placerat vel, faucibus non tortor. Quisque ut augue et augue consequat blandit nec vel leo. Donec aliquam mauris vel ultrices viverra. Donec pulvinar et odio eget commodo. Maecenas massa odio, tincidunt vitae erat sed, sodales malesuada nisl. Sed consequat libero enim, sed porttitor tortor lacinia et. Donec gravida luctus purus a semper. Fusce id tincidunt eros. Vestibulum sit amet nunc id lorem vestibulum euismod id vitae tortor. Pellentesque ac consectetur dui. Aenean nec maximus neque. Nulla facilisi. Vivamus non ex sodales, malesuada mi ac, pulvinar nibh.</h1>
                    }



                    </Col>

                        {related.map(item=>(
                    <Col xs={8}>
                             <Product product={item}  heading={item.name}  brand={item.brand} color={item.color} image={item.image} size={item.size} price={item.price}/>
                    </Col>
                        ))}
                </Row>
            }
        </Grid>
    </div>
  )
}

export default ProductDetails