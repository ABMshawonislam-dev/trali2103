import React, { useEffect,useState } from 'react'
import axios from 'axios'
import {Container,Grid,Row,Col } from 'rsuite';
import Product from './Product';
import Pagination from './Pagination'
const Topproducts = () => {

    let [products,setProducts] = useState([])

    useEffect(()=>{
        async function fetchProduct(){
            let {data} = await axios.get("http://localhost:8000/products")
            console.log(data)
            setProducts(data)

        }

        fetchProduct()
    },[])
  return (
    <Container className='container topproduct'>

        <Grid>  
            <Row className="show-grid" gutter={30}>
                <Col xs={12}>
                    <h2 >Top Products</h2>
                </Col>
                <Col xs={12}>
                    <ul>
                        <li> <span></span> All</li>
                        <li> <span></span> Boys Collection</li>
                        <li> <span></span> Girl Collection</li>
                        <li> <span></span> Shose Collection</li>
                    </ul>
                </Col>
            </Row>
        </Grid>

        <Grid>  
            <Row className="show-grid" gutter={30}>
                {/* {products.map(item=>(

                    <Col xs={6}>
                        <Product img={item.image} heading={item.name} rating={item.rating} brand={item.brand} color={item.colors} size={item.sizes} price={item.price}/>
                    </Col>
                ))} */}

                {/* {products.map(item=>(
                    <Col xs={6}>
                     <Product product={item}  heading={item.name}  brand={item.brand} color={item.color} image={item.image} size={item.size} price={item.price}/>
                     </Col>
                ))} */}
              
                <Pagination product={products}  itemsPerPage={2}/>
            </Row>
        </Grid>
    </Container>
  )
}

export default Topproducts