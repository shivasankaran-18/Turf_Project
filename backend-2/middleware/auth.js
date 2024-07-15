import jwt from "jsonwebtoken"


const authMiddleWare = async(req,res,next)=>{
    
    const {token,email} = req.headers;
    console.log(token + " "+email)
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Token:"+token_decode.emailId);
        req.headers.email = token_decode.emailId;
        console.log("hello "+req.headers.email);
        next();
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:"Error in jwt"});
    }
}

export {authMiddleWare}