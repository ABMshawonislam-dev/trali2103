import React,{useState,useRef} from 'react'
import SideDashboard from '../components/SideDashboard'
import {Row,Col,Form,ButtonToolbar,Button,Checkbox} from 'rsuite'
import JoditEditor from "jodit-react";
import axios from 'axios'
const ProductUpload = () => {

    const editor = useRef(null)
	const [content, setContent] = useState('')
	const [color, setColor] = useState([])
	const [productname, setProductname] = useState('')
	const [productbrand, setProductbrand] = useState('')
	const [productcategory, setProductcategory] = useState('')
	const [productprice, setProductprice] = useState('')
	const [productsize, setProductsize] = useState([])

let handleColor = (e)=>{
    if(e.split("").indexOf("#") != -1){
        console.log("# not Allow")
    }else{

        setColor(e.split(','))
    }
}


    const sizeArr = []

let handleSizeSmall = (e)=>{

    if(sizeArr.indexOf("sm") != -1){
        sizeArr.splice(sizeArr.indexOf("sm"), 1)
    }else{
        sizeArr.push("sm")
    }


}

let handleSizeMedium = (e)=>{
    if(sizeArr.indexOf("md") != -1){
        sizeArr.splice(sizeArr.indexOf("md"), 1)
    }else{
        sizeArr.push("md")
    }
   
}

let handleSizeLarge = (e)=>{
    if(sizeArr.indexOf("lg") != -1){
        sizeArr.splice(sizeArr.indexOf("lg"), 1)
    }else{
        sizeArr.push("lg")
    }

}

let handleSizeExtralarge = (e)=>{
    if(sizeArr.indexOf("xl") != -1){
        sizeArr.splice(sizeArr.indexOf("xl"), 1)
    }else{
        sizeArr.push("xl")
    }

}

let handleProductSubmit = async ()=>{
    // console.log(sizeArr)
    // setProductsize(sizeArr)
    let {data} = await axios.post('http://localhost:8000/product',{
        name: productname,
        description: content,
        brand: productbrand,
        category: productcategory,
        price: productprice,
        color: color,
        size:sizeArr

    })

    console.log(data)
}

  return (
    <Row className="show-grid" gutter={30}>
    <Col xs={2}>
        <SideDashboard></SideDashboard>
    </Col>
    <Col xs={22}>
        <Form fluid>
            <Form.Group controlId="name-1">
            <Form.ControlLabel>Product Name</Form.ControlLabel>
            <Form.Control onChange={(e)=>setProductname(e)} type="text" name="name" placeholder='Product Name'/>
            </Form.Group>
            <Form.Group controlId="name-1">
                <Form.ControlLabel>Product Description</Form.ControlLabel>
                <JoditEditor
            	ref={editor}
                value={content}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
            />
            </Form.Group>
            <Form.Group controlId="name-1">
                <Form.ControlLabel >Product Brand</Form.ControlLabel>
                <Form.Control onChange={(e)=>setProductbrand(e)} type="text" name="name" placeholder='Product Brand'/>
            </Form.Group>
            <Form.Group controlId="name-1">
                <Form.ControlLabel>Product Category</Form.ControlLabel>
                <Form.Control onChange={(e)=>setProductcategory(e)} type="text" name="name" placeholder='Product Category'/>
            </Form.Group>
            <Form.Group controlId="name-1">
                <Form.ControlLabel>Product Price</Form.ControlLabel>
                <Form.Control onChange={(e)=>setProductprice(e)} type="text" name="name" placeholder='Product Price'/>
            </Form.Group>
            <Form.Group controlId="name-1">
                <Form.ControlLabel>Product Color</Form.ControlLabel>
                <Form.Control onChange={handleColor} type="text" name="name" placeholder='Product Color Code'/>
                {color.length > 0
                &&
                color.map(item=>(
                    <span style={{width:'20px',height:'20px',background:`#${item}`,display:'inline-block',borderRadius: '50%',margin:'5px'}}></span>

                ))
                }
            </Form.Group>
            <Form.Group controlId="name-1">
                <Form.ControlLabel>Product Size</Form.ControlLabel>
                <Checkbox onChange={handleSizeSmall}> SM</Checkbox>
                <Checkbox onChange={handleSizeMedium}> MD</Checkbox>
                <Checkbox onChange={handleSizeLarge}> LG</Checkbox>
                <Checkbox onChange={handleSizeExtralarge}> XL</Checkbox>
            </Form.Group>
            
            <Form.Group>
            <ButtonToolbar>
                <Button onClick={handleProductSubmit} appearance="primary">Submit</Button>
                <Button appearance="default">Cancel</Button>
            </ButtonToolbar>
            </Form.Group>
        </Form>
    </Col>
</Row>
  )
}

export default ProductUpload