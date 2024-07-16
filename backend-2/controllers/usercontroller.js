
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


/* Login User */

const login = async (req,res)=>{
    const {email,password} = req.body;
    console.log(email);
    try{
        const user = await prisma.user.findUnique({
            where:{

                email:email
            },
           
        })
        console.log(user);
        
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        const match = await bcrypt.compare(password,user.password);  // We can't use direct if cond to check the user.password == password as the user's password is encrypt by bycrpt so we need to use compare method of bycrpt
        if(!match){
            return res.json({success:false,message:"Invalid Credantails"});
        }
        const token = createToken(user.id);
      
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
        const exists = await prisma.user.findUnique({
            where:{
                email
            }
        })
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
        
        const newUser = await prisma.user.create({
            data:{
                email,
                name,
                password:hashedPass
            },
           
        })
       
        const token = createToken(newUser.id);
        console.log(newUser)
        res.json({success:true,token:`Bearer ${token}`})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }



}

const detail=async(req,res)=>{
    const user=await prisma.user.findUnique({
        where:{
            email:req.headers.email
        }
    })
    return res.json(user)

}


export {login,register,detail}