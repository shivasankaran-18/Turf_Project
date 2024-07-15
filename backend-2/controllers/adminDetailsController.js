import { PrismaClient } from "@prisma/client";
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const prisma = new PrismaClient();

const adminlogin = async (req,res)=>{
    const {emailId,password} = req.body;
    try{
        const admin = await prisma.adminDetails.findUnique({
            where:{

                emailId:emailId
            },
            select:{
                emailId:true,
                password:true
            }
        })
        console.log(admin);
        if(!admin){
            return res.json({success:false,message:"User not found"});
        }
        const match = await bcrypt.compare(password,admin.password);  // We can't use direct if cond to check the user.password == password as the user's password is encrypt by bycrpt so we need to use compare method of bycrpt
        if(!match){
            return res.json({success:false,message:"Invalid Credantails"});
        }
        const token = createToken(admin);
      
        res.json({success:true,token:`Bearer ${token}`});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}


const createToken = ({emailId,password}) =>{
    console.log(process.env.JWT_SECRET);
    console.log("EmailId:"+emailId)
    return jwt.sign({emailId},process.env.JWT_SECRET);
}

/* Register user */

const adminregister = async (req,res) =>{
    const {name,email,password,contact} = req.body;
    try{
        // checking is the user already exists
        const exists = await prisma.adminDetails.findUnique({
            where:{
                emailId:email
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
        
        const newUser = await prisma.adminDetails.create({
            data:{
                name:name,
                emailId:email,
                contact:contact,
                password:hashedPass,
            }
        })
       
        const token = createToken(newUser);
        console.log(newUser)
        res.json({success:true,token:`Bearer ${token}`})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }



}

const admindetail=async(req,res)=>{
    const user=await prisma.user.findUnique({
        where:{
            email:req.headers.email
        }
    })
    return res.json(user)

}


export {adminregister,adminlogin,admindetail}