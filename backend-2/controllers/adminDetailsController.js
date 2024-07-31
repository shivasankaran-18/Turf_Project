import { PrismaClient } from "@prisma/client";
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const prisma = new PrismaClient();

const adminlogin = async (req,res)=>{
    const {emailId,password} = req.body;
    console.log(req.body);
    try{
        const admin = await prisma.adminDetails.findUnique({
            where:{

                emailId:emailId
            },
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


const createToken = ({id}) =>{
    console.log(process.env.JWT_SECRET);
    return jwt.sign({id},process.env.JWT_SECRET);
}



const adminregister = async (req,res) =>{
    const {name,email,password,contact} = req.body;
    try{
      
        const exists = await prisma.adminDetails.findUnique({
            where:{
                emailId:email
            }
        })
        if(exists){
            return res.json({success:false,message:"Email already exists"});
        }
      
        if(!validator.isEmail(email)){   
            return res.json({success:false,message:"Enter valid email"});
        }

        if(password.length < 8){
            return res.json({success:false,message:"Password isn't strong"});
        }

      

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        
        const newUser = await prisma.adminDetails.create({
            data:{
                name:name,
                emailId:email,
                contact:contact,
                password:hashedPass,
            },select:{
                id:true
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
    const user=await prisma.adminDetails.findUnique({
        where:{
            id:req.headers.id
        }
    })
    return res.json(user)

}


export {adminregister,adminlogin,admindetail}