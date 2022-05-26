const express = require('express')
const mongoose = require('mongoose');
const bannerData = require('./bannerData')
const logoData = require('./logoData')
const dealData = require('./dealData')
const productData = require('./productData')
const featureData = require('./featureCat')
const User = require('./model/usermodel.js')
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

app.get("/products",function(req,res){
    res.send(productData)
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

app.put('/vendor/:id',async(req,res)=>{
    console.log(req.params)
    const data = await User.findByIdAndUpdate(req.params.id,{isVendor: true},function(err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
        }
    })
})

app.listen(8000,()=>{
    console.log("Server Running on nport 8000")
})

