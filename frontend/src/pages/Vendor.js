import React, { useState, useContext } from 'react'
import {Checkbox,Button} from 'rsuite'
import {Store} from '../Store'
import axios from 'axios'

const Vendor = () => {
    const {state} = useContext(Store)
    let [agree,setAgree] = useState(false)
    let handleVendor = async ()=>{
        console.log("click")
        console.log(state.userInfo._id)
        let {data} = await axios.put(`http://localhost:8000/vendor/${state.userInfo._id}`)
        console.log(data)
    }
  return (
    <div className='container'>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

        <Checkbox onChange={()=> setAgree(!agree)}> Accept The Agreement</Checkbox>
            <br/>

            {agree
            ?
            <Button color="violet" appearance="primary" onClick={handleVendor}>Become Vendor</Button>
            :
            <Button color="violet" appearance="primary" disabled>Become Vendor</Button>
            }
        
    </div>
  )
}

export default Vendor