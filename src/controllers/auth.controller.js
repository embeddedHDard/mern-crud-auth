import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from '../config.js'

import {createAccessToken} from '../libs/jwt.js'

export const register = async(req, res) => {
    const {username, email, password } = req.body    

    try {       
         const userFound = await User.findOne({ email });

         if(userFound){
            return res.status(400).json(["Email already in use"]);
        }
           

        const passwordHash = await bcrypt.hash(password, 10); //string aleatorio encriptado  para la contraseña  
        
        const newUser = new User({
        username,
        email,
        password : passwordHash
    })

    const userSaved = await newUser.save(); //creación de usuario

    const token = await createAccessToken({id: userSaved._id}) //cuando me des el token

    res.cookie('token', token) //método de express para guardar algo dentro de la cookie
  
    res.json({
         id: userSaved._id,
         username: userSaved.username,
         email: userSaved.email
     })
     
    }catch(error){
       res.status(500).json({message: error.message});
    }

};

export const login = async(req, res) => {
    const { email, password } = req.body
    console.log(password);

    try {
        const userFound = await User.findOne({email});

        if (!userFound) 
            return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, userFound.password);
        console.log(userFound.password);

        if(!isMatch) 
            return res.status(400).json({message: "Incorrect Password"});
        
        const token = await createAccessToken({id: userFound._id});

        res.cookie('token', token); //método de express para guardar algo dentro de la cookie
    
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
     
    }catch(error){
       res.status(500).json({message: error.message});
    }

};

export const logout = (req,res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    //console.log(req.user);
    const userFound = await User.findById(req.user.id);

    if(!userFound) 
        return res.status(404).json({message: "User not found"});

   // res.status(200).json("Profile");

    return res.status(200).json({ //Devolvemos en la respuesta el usuario encontrado 
          id: userFound._id,
          username: userFound.username,
          email: userFound.email
     });

    //res.status(200).json("Profile");
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if(!token) res.status(401).json({message: "Sin autorizacion"});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) res.status(401).json({message: "Sin autorizacion"});

        const userFound = await User.findById(user.id )

        if(!userFound)
            return res.status(401).json({message: "Sin autorizacion"});

        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        });
    });

};