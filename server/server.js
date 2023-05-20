const express = require('express');
const cors = require('cors');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const mongoose  = require('mongoose');
const User = require('./model/user');
const app = express();
require('dotenv').config();

const MONGO_URI = process.env.MONGO_CONNECTURI;
const JWT_SECRET = process.env.JWT_SECRET;
mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URI,(err)=>{
    if(err)
        console.log(err)
    else
        console.log('Connected to MongoDB')
});

app.use(express.json());
app.use(cors());

app.post('/api/register', async(req,res) => {

    try {
        const data = req.body;

        let user = await User.findOne({ email: data.email });

        if(!user){

            let hashedPassword = await argon2.hash(data.password);

            await User.create({
                name: data.name,
                email: data.email,
                password: hashedPassword
            });
            return res.status(201).json({ message: 'User Created'});
        } else {
            return res.status(409).json({ message: 'User already exists'});
        }
    } catch (error) {
        return res.status(501).json({ message: 'error'});
    }
});

app.post('/api/login', async(req,res) => {

    try {
        const data = req.body;
        const user = await User.findOne({
            email: data.email
        });

        if(user){
            if (await argon2.verify(user.password, data.password)) {
                let token = jwt.sign({ email: user.email},JWT_SECRET, { expiresIn: 60 });

                return res.status(200).json({ message: 'ok', token : token});
              } else {
                return res.status(401).json({ message: 'password mismatch'});
              }
        } 
        return res.status(400).json('user not found');
    } catch (error) {
        return res.status(501).json({ message: 'error' });
    }
});

app.post('/api/verifytoken', async(req,res) => {

    try {
        const data = req.body;

        let token = jwt.verify(data.token,JWT_SECRET,(err)=>{
            if(err)
                return res.status(401).json({ message: 'session ended'});
        
            return res.status(200).json({ message: 'ok'});
        });

        
        
    } catch (error) {
        return res.status(501).json({ message: 'error' });
    }
});

app.post('/api/check', async(req,res) => {

    console.log('check: running')
    
    res.json({ status: 'ok'})
    

});

app.listen(4000,()=>{console.log('Server Started on port 4000')});