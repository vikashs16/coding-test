let express = require('express');
let bodyParser= require('body-parser');
let db = require('./db');
let product = require('./model')
let userInfo = require('./userModel');
let cardInfo = require('./card');
let app = express();

const bcrypt = require('bcrypt');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// API to use get product list of camera
app.get('/product/list',async (req,res) =>{
    try {
        let getdata = await product.find({});
           if(getdata){
               res.send(getdata)
           }else{
               res.send({
                   status:401,
                   message:"data not found",
                   response:error
               })
           } 
       }catch(err){
           console.log("data not save!", err);
       }
});

// user register info
app.post('/user',async (req,res) =>{
    try {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(req.body.password, salt)
        const tutorial = new userInfo({
            name: req.body.name,
            password: hash,
            email:req.body.email
        });
        tutorial.save(tutorial).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:err.message || "Some error occurred while creating the Tutorial."
            });
        });
    }catch(err){
        console.log("data not save!", err);
    }
});


// user login
app.get('/user/login',async (req,res) =>{
    try {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(req.body.password, salt)
        const password = await bcrypt.compare(req.body.password, hash);
        if(password){
            let getUserInfo = await userInfo.find({
                user:req.body.name
            });
            res.send({
                status:200,
                message:"user login sucessfully"
            })
        }else{
            res.send({
                status:"error",
                message:"password is not match"
            })
        }   
       }catch(err){
           console.log("data not save!", err);
       }
});

// add product in card
app.post('/addIn/card',async (req,res) =>{
    try {
        let card = await cardInfo.findOne({userID:req.body.userID})
        if(card){
            let infoCard = await cardInfo.updateOne({ 
                $addToSet: { productName: { $each: [req.body.productName] } } 
            })
            res.send({
                status:"success",
                data:infoCard
            })
        }else{
            const tutorial = new cardInfo({
                productName:req.body.productName,
                userID:req.body.userID
            });
            tutorial.save(tutorial).then(data => {
                res.send({
                    status:"success",
                    message:"insert data successfully",
                    data:data
                });
            }).catch(err => {
                res.status(500).send({
                    message:err.message || "Some error occurred while creating the Tutorial."
                });
            });
        }
    }catch(err){
        console.log("data not save!", err);
    }
});

// get product in card

app.get('/card/product', async (req,res) =>{
    try{
        let cardData = await cardInfo.findOne({userID:req.body.userID})
        if(cardData){
            res.send({
                status:200,
                message:"data list",
                response:cardData
            })
        }else{
            res.send({
                status:201,
                message:"Product not found for this user"
            })
        }
    }catch(err){
        console.log("error ::++",err)
    }
})


app.listen(8080 ,()=>{
    console.log('connect to database and server has been start 8080')
})
    

