import jwt from "jsonwebtoken"


const authMiddleWare = async(req,res,next)=>{
    
    const [,token] = req.headers.authorization.split(" ");
    
    try{
        
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.headers.email = token_decode.email;
        console.log("hello "+req.headers.email);
        next();
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:"Error in jwt"});
    }
}

export {authMiddleWare}