require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());
require("./mongoose_connection");
const User = require("./models/user");
const sessions = new Set();
// server
// const sessions = new Map();


// app.get("/", authToken, (req, res) =>{
//     // console.log(req.cookies);
//     // const user = req.user;
//     // res.json({message: `helloe!!! ${user.username}`});
//     res.json({message: "Hello world"});
// })

app.get("/admin", (req,res) =>{
    res.json(users);
})

app.post("/register",async (req,res) =>{
    try{
        const {name, password, email, role} = req.body;
        // console.log(email);
        const user = await User.findOne({email: email});

        if(user){
            console.log(user);
            return res.status(401).json({message: "User already exist"});
        }


        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const newUser = await User({name: name, password: hash, email: email, role: role}) ;
        const result = await newUser.save();
        console.log(req.body);
        res.status(201).json(result);

    }catch(err){
        return res.status(500).json({message: err.message});
    }
})

app.post("/login", async (req,res) =>{
    try{
    const {email, password} = req.body;
   
    const user = await User.findOne({email: email});
    if(!user) {
        return res.status(401).json({message: "Incorrect username"});
    }
    const isMatched = await bcrypt.compare(password, user.password);
    console.log(isMatched);
    if(!isMatched){
        return res.status(402).json({message: "Password is incorrect"});
    }
    const userInfo = {name: user.name, email: user.email, role: user.role};
    const token_data = {user: userInfo};
    const token = generateToken(token_data)
    const refresh_token = jwt.sign(token_data,  process.env.REFRESH_TOKEN_SECRET);
    sessions.add(refresh_token);
    res.status(201).json({token: token, refresh_token: refresh_token});
        
    }catch(err){
        return res.status(500).json({message: err.message});
    }
    

})

app.post("/token", (req,res) =>{
    const refresh_token = req.body.token;
    if(!sessions.has(refresh_token)) return res.status(500).json({message: "Not authorise"});

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, function(err, user){
        if(err){
            return res.status(500).json({message: "Forbidden", err: err.message});
        }

        // timestamp should be remved so that it will generate new token.
        console.log(user);
        const userInfo = {name: user.name, email: user.email, role: user.role};
        const token_data = {user: userInfo};
        const token = generateToken(token_data);
        return res.json({ new_access_token : token});
    })
})



app.delete("/logout", (req,res) =>{
    const refresh_token = req.body.token;
    console.log(refresh_token);
    if(!sessions.has(refresh_token)){
        return res.status(404).json({message: "dont try again"})
    }
    sessions.delete(refresh_token);
    res.json({message: "Logout successfully"})
})


function generateToken(data){
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
}


app.listen(5060, ()=>{
    console.log("Server is running 5060");
})

