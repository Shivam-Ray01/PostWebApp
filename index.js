const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/' , (req , res) =>{
    res.render('index');
});

app.get('/register' , async (req , res) =>{
   let {email, username , name , age , password} = req.body;
      let user = await userModel.finndOne({email});
   if (user) return res.status(404).send('user already registered');
     
   bcrypt.genSalt(10 , (err, salt) =>{
    bcrypt.hash(password , salt , async (err , hash) =>{
       let user = await userModel.create ({
            username, 
            email, 
            name,
            password: hash, 
            age
        });
    });
   });

}); 

app.listen(3000);
