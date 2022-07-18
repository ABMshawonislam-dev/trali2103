const express = require('express')
const mongoose = require('mongoose');
const bannerData = require('./bannerData')
const logoData = require('./logoData')
const dealData = require('./dealData')
const productData = require('./productData')
const featureData = require('./featureCat')
const User = require('./model/usermodel.js')
const Storename = require('./model/storenameModel.js')
const Product = require('./model/productUpload.js')
const ProductPosition = require('./model/productPositionModel.js')
const Cupon = require('./model/cuponModel.js')
const bcrypt = require('bcrypt');
mongoose.connect('mongodb+srv://esmern:mern2103@cluster0.cfxjq.mongodb.net/trali?retryWrites=true&w=majority',()=>{
    console.log("DB Connected")
});
var cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get("/logo",function(req,res){
    res.send(logoData)
})

app.get("/banner",function(req,res){
    res.send(bannerData)
})

app.get("/deal",function(req,res){
    res.send(dealData)
})


app.get("/feature",function(req,res){
    res.send(featureData)
})

app.post("/registration",function(req,res){
    

    

    // console.log(userInfo)
    bcrypt.hash(req.body.password, 10).then(function(hash) {
        let userInfo = {
            name: req.body.name,
            email: req.body.email,
            password: hash,
        }
        const user = new User(userInfo)
    
        user.save()
        
    });


})

app.post("/login",async (req,res)=>{
    const data = await User.find({email:req.body.email})


    if(data[0]){
         bcrypt.compare(req.body.password, data[0].password).then(function(result) {
               if(result){
                   res.send({data:data[0],msg:"Login Successful"})

               }else{
                   res.send("Password Not Matched")
               }
        });
    }else{
        res.send("Email Not Found")
    }

   
})

app.post('/product',(req,res)=>{
    console.log(req.body)
    let productInfo = {
        name: req.body.name,
        descripton: req.body.description,
        image: req.body.productimage,
        brand: req.body.brand,
        category: req.body.category,
        size: req.body.size,
        price: req.body.price,
        color: req.body.color
    }

    const product = new Product(productInfo)
    product.save()
    res.send(product)

})

app.get("/products",async function(req,res){
    let data = await Product.find({})

    res.send(data)
})

app.post('/productposition',(req,res)=>{
    console.log(req.body)
    let productpositionInfo = {
        label: req.body.name,
        value: req.body.value,

    }

    const position = new ProductPosition(productpositionInfo)
    position.save()
    res.send(position)

})

app.get('/productposition',async (req,res)=>{
    let data = await ProductPosition.find({})
    res.send(data)
})


app.put('/vendor/:id',(req,res)=>{
    console.log(req.params)
   User.findByIdAndUpdate(req.params.id,{isVendor: true},{new:true},function(err,docs){
        if(err){
            console.log(err)
        }else{
            res.send(docs)
        }
    })
})

app.post('/storename',(req,res)=>{
    console.log(req.body)

    let storenameInfo = {
        storename: req.body.storename,
        owner: req.body.owner,
        ownername: req.body.ownername
    }

    const storename = new Storename(storenameInfo)
    storename.save()
    res.send(storename)
})

app.get('/storename/:id',async (req,res)=>{

    const data = await Storename.find({owner: req.params.id})
    res.send(data)

   
})

app.put('/storename',(req,res)=>{
    console.log(req.body)
  Storename.findByIdAndUpdate(req.body.id,{storename: req.body.storename},function(err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
        }
    })
})

app.delete('/storename/:id',(req,res)=>{
    console.log(req.body)
  Storename.findByIdAndDelete(req.params.id,function(err,docs){
    if(err){
        console.log(err)
    }else{
        res.send("delete complete")
        console.log(docs)
    }
})
})

app.post('/cupon',(req,res)=>{
    console.log(req.body)

    let cuponInfo = {
        cuponname: req.body.cuponname,
        discountamount: req.body.discountamount
    }

    const cupon = new Cupon(cuponInfo)
    cupon.save()
})

app.get('/cupon/:cupon',async (req,res)=>{
    console.log(req.params.cupon)
    let data = await Cupon.find({cuponname: req.params.cupon})
    console.log(data)
    res.send(data)

})

app.get('/productdetails/:id',async(req,res)=>{
    
    let data = await Product.findById(req.params.id)
    res.send(data)

})


app.listen(8000,()=>{
    console.log("Server Running on nport 8000")
})

