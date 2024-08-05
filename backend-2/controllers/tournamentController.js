import { Prisma, PrismaClient } from "@prisma/client";
import { PutObjectAclCommand } from '@aws-sdk/client-s3';
import { S3Client, PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto';

const prisma = new PrismaClient();

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

const randomName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
const addTournament = async(req, res) => {
    console.log("admin id:", req.headers.id)
    const turf = await prisma.turf.findUnique({
        where: {
            adminId: req.headers.id,
        },
        select: {
            id: true
        }
    });
    try {
        await prisma.$transaction(async (tx) => {
            const imageUrls = await Promise.all(req.files.map(async (file) => {
                const params = {
                    Bucket: bucket_name,
                    Key: randomName(),
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };
                const command = new PutObjectCommand(params);
                await s3Client.send(command);
                return `https://${bucket_name}.s3.${bucket_region}.amazonaws.com/${params.Key}`;
            }));
            const data = await tx.tournament.create({
                data: {
                    turfId: turf.id,
                    total_teams:parseInt(req.body.total_teams),
                    duration:parseInt(req.body.duration),
                    name: req.body.name,
                    mode: parseInt(req.body.mode),
                    price: parseInt(req.body.price),
                    registrationstartDate: req.body.stdate,
                    registrationendDate: req.body.enddate,
                    images: imageUrls
                }
            });
            res.json({ success: true, message: data });
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating tournament" });
    }
};

const listTournament=async(req,res)=>{
    try{
        const tournaments=await prisma.tournament.findMany({})
        const details=await prisma.turf.findMany({})
        return res.json({tournaments,details})
    }
    catch{
        return res.json({msg:"error"})
    }
    

}

const getavailableUsersforATournament = async (req,res) =>{
    console.log(req.params);
    const tournamentId = req.body.ID;
    const userId = req.headers.id;
    console.log(tournamentId)
    console.log(userId);
    try{
        const participants = await prisma.tournamentParticipant.findMany({
            where:{
                tournamentId: parseInt(tournamentId)
            },select:{
                teamLeadId: true,
                members:{
                    select:{
                        userId:true
                    }
                }
            }
        })
        const participantsInThatTournament = participants.reduce((ids,participant)=>{
            ids.add(participant.teamLeadId);
            participant.members.forEach(member => ids.add(member.userId));
            return ids;
        },new Set());
        participantsInThatTournament.add(req.headers.id)
        const users = await prisma.user.findMany({
            where:{
                id:{
                    notIn:Array.from(participantsInThatTournament),
                }
            }
        });
        res.json({success:true,message:"Successfull filteration",data:users})

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Testing failed"})
    }
}


const bookTournament = async (req,res) => {
    const {tournamentId,memberEmails} = req.body;
    const teamLeadId = req.headers.id;
    const teamLeadName = await prisma.user.findUnique({
        where:{
            id:teamLeadId
        },
        select:{
            name:true
        }
    })
    console.log(teamLeadName)
    try{
        const members = await prisma.user.findMany({
            where:{
                email:{in:memberEmails},
            },
            select:{
                id:true,
            }
        });
        if(members.length !== memberEmails.length){
            return res.json({success:false,message:"One or more emails are invalid"});
        }
        const newParticipant = await prisma.tournamentParticipant.create({
            data:{
                tournamentId : parseInt(tournamentId),
                teamLeadId:parseInt(teamLeadId),
                teamLeadName: teamLeadName.name,
            }
        });
        console.log(members);
        const memberPromises = members.map((member) => {
            return prisma.member.create({
              data: {
                userId: member.id,
                participation_id: newParticipant.id,
              },
            });
        });
        await Promise.all(memberPromises);
        res.json({ success: true, message: "Tournament booked successfully" ,members:memberPromises,participation:newParticipant});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error booking tournament"});
    }
}

const getregisteredTournement = async(req,res) =>{
    const id = req.headers.id;
    const asTeamLeader = await prisma.tournamentParticipant.findMany({
        where:{
            teamLeadId:id
        },select:{
            tournamentId:true
        }
    })
    const tournamentIds = asTeamLeader.map(x=>x.tournamentId);
    
    const tournamentsAsTeamLead = await prisma.tournament.findMany({
        where:{
            id:{
                in : tournamentIds
            }
        }
    })
    const asMember = await prisma.member.findMany({
        where:{
            userId:id,
        },select:{
            participation_id:true,
        }
    })
    const participantionIds = asMember.map(x=>x.participation_id)
    const tournamentIdasMember = await prisma.tournamentParticipant.findMany({
        where:{
            id:{
                in:participantionIds,
            }
        },select:{
            tournamentId:true,
        }
    })
    console.log(tournamentIdasMember)
    res.json({success:true,data:tournamentsAsTeamLead})
}

export {getavailableUsersforATournament,bookTournament,getregisteredTournement,addTournament,listTournament}