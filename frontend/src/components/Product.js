import React, { useContext, useState } from 'react'
import {Panel} from 'rsuite'
import {BsStarFill,BsStar,BsStarHalf,BsBag } from 'react-icons/bs';
import { Store } from '../Store';

const Product = (props) => {

  const {cartstate,cartdispatch} = useContext(Store)
  const {cart} = cartstate
  const [activeColor,setActivecolor] = useState("")
  const [activeSize,setActivesize] = useState("")

  let handleCartProductAdd = (product) => {

    const existingItem = cart.cartItems.find((item)=>item._id === product._id)

    const quantity = existingItem?existingItem.quantity + 1:1

    const color = activeColor
    const size = activeSize

    cartdispatch({type:'CART_ADD_PRODUCT',payload: {...product,quantity,color,size}})

   
  }

  return (
    <div className='singleproduct'>
      <Panel  bodyFill style={{ display: 'inline-block', width: "100%" }}>
        <img src={props.image} style={{ width: "100%" }}/>
       <div className="productbox">
         <div className="producticon">
            {props.rating >= 1 ? <BsStarFill className='staricon'/>:props.rating >= .5?<BsStarHalf className='staricon' />: <BsStar className='staricon' />}
            {props.rating >= 2 ? <BsStarFill className='staricon'/>:props.rating >= 1.5?<BsStarHalf className='staricon' />: <BsStar className='staricon' />}
            {props.rating >= 3 ? <BsStarFill className='staricon'/>:props.rating >= 2.5?<BsStarHalf className='staricon' />: <BsStar className='staricon' />}
            {props.rating >= 4 ? <BsStarFill className='staricon'/>:props.rating >= 3.5?<BsStarHalf className='staricon' />: <BsStar className='staricon' />}
            {props.rating >= 5 ? <BsStarFill className='staricon'/>:props.rating >= 4.5?<BsStarHalf className='staricon' />: <BsStar className='staricon' />}
         </div>
         <div className="brand">
            <p className="productBrand">{props.brand}</p>
         </div>
       </div>
        
       
        <Panel header={props.heading}>
        <div className="productbox">
         <div className="productcolorbox">
            {props.color.map(item=>(
              <span className={activeColor == item?'productColor activeColor':'productColor'} style={{background: `#${item}`}} onClick={()=>setActivecolor(item)}></span>
            ))}
         </div>
         <div className="productsize">
           {props.size.map(item=>(
              <span className={activeSize == item?'productSize productActiveSize':'productSize'} onClick={()=>setActivesize(item)}>{item}</span>
            ))}
         </div>
       </div>

       <span onClick={()=>handleCartProductAdd(props.product)} className='cart'>
         <BsBag className='productcart'/>
       </span>
       <span className='price'>
         ${props.price}
       </span>
        
        </Panel>
      </Panel>
    </div>
  )
}

export default Product