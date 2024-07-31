import jwt from "jsonwebtoken"
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport from "passport";
const authMiddleWare = async(req,res,next)=>{
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(" ")[1];
    console.log("token"+token)
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Token:"+token_decode.id);
        req.headers.id = token_decode.id;
        console.log("hello "+req.headers.id);
        next();
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:"Error in jwt"});
    }
}


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5173/home",
    passReqToCallback   : true
  },
  async function (request, accessToken, refreshToken, profile, done) {
    try {
        let user = await prisma.user.findUnique({
            where: { id: profile.id },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    password: '', // Since it's OAuth, password might not be needed
                },
            });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
  }
));

export {authMiddleWare}