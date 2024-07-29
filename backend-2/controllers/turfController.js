import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();
import { S3Client, PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import multer from "multer";
import crypto from 'crypto';


dotenv.config();

const bucket_name = process.env.BUCKET_NAME;
const bucket_region = process.env.BUCKET_REGION;
const access_key = process.env.ACCESS_KEY;
const secret_key = process.env.SECRET_ACCESS_KEY;

/* S3 Config */
const s3Client = new S3Client({
  region: bucket_region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key
  }
});

/* Multer config */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const addTurf = async (req, res) => {
  console.log(req.files);
  const admin = await prisma.adminDetails.findUnique({
    where: { id: req.headers.id }
  });
  console.log(req.body)
  console.log("admin", admin);
  if (!admin) {
    return res.json({ success: false, message: "Please login as admin to add turf" });
  }

  try {
    await prisma.$transaction(async (tx) => {
      const imageUrls = await Promise.all(req.files.map(async (file) => {
        const params = {
          Bucket: bucket_name,
          Key: randomName(),
          Body: file.buffer,
          ContentType: file.mimetype
        };
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        return `https://${bucket_name}.s3.${bucket_region}.amazonaws.com/${params.Key}`;
      }));

      const newTurf = await prisma.turf.create({
        data: {
          turfName: req.body.turfName,
          area: req.body.area,
          city: req.body.city,
          state: req.body.state,
          sports: req.body.sports,
          adminId: admin.id,
          images: imageUrls // Assuming images field is a string array in Prisma model
        }
      });

      res.json({ success: true, message: "Turf Added", turf: newTurf });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to add Turf" });
  }
};



const getTurfSlot=async(req,res)=>{
    const params=req.headers.id;
    const turf = await prisma.turf.findUnique({
      where:{
        id:parseInt(req.query.id)

      }
    })
    console.log(turf);
    const turfslot=await prisma.turfSlot.findMany({
        where:{
            turfId:turf.id,
            available:true
        }
    })
    const enrichedTurfSlots = turfslot.map(slot => ({
      ...slot,
      images: turf.images,
      turfName: turf.turfName,
      area:turf.area,
      city:turf.city,
      state:turf.state,
      sports:turf.Sports
    }));
    console.log("hii *******************"+enrichedTurfSlots);
    return res.json(enrichedTurfSlots);
}
const admingetTurf = async(req,res) =>{
  const params = req.headers.id;
  const turf = await prisma.turf.findUnique({
    where:{ adminId : params}
  });
  return res.json({turf});
}

const listTurf = async(req,res) =>{

    const turf=await prisma.turf.findMany({ })
    return res.json(turf);
}
export {addTurf,listTurf,getTurfSlot,admingetTurf}