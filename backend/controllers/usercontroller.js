import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"

/* Login User */

const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        const match = await bcrypt.compare(password,user.password);  // We can't use direct if cond to check the user.password == password as the user's password is encrypt by bycrpt so we need to use compare method of bycrpt
        if(!match){
            return res.json({success:false,message:"Invalid Credantails"});
        }
        const token = createToken(user._id);
        res.json({success:true,token:`Bearer ${token}`});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}


const createToken = (id) =>{
    console.log(process.env.JWT_SECRET);
    return jwt.sign({id},process.env.JWT_SECRET);
}

/* Register user */

const register = async (req,res) =>{
    const {name,password,email} = req.body;
    try{
        // checking is the user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"Email already exists"});
        }
        // validating the email and password using validator
        if(!validator.isEmail(email)){   /* This returns whether email is valid  */
            return res.json({success:false,message:"Enter valid email"});
        }

        if(password.length < 8){
            return res.json({success:false,message:"Password isn't strong"});
        }

        /* hashing the password using bcrypt by salting it */

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        
        const newUser = new userModel(
            {
                name:name,
                email:email,
                password:hashedPass,
            }
        )
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token:`Bearer ${token}`})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }



}


export {login,register}