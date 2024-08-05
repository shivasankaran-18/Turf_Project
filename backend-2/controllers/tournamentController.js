import { Prisma, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const getavailableUsersforATournament = async (req,res) =>{
    const Id = req.headers.id;
    console.log(Id) 
    try{
        const participants = await prisma.tournamentParticipant.findMany({
            where:{
                tournamentId: parseInt(Id)
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
    const {tournamentId,teamLeadId,teamLeadName,memberEmails} = req.body;
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
                teamLeadName: teamLeadName,
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
}

export {getavailableUsersforATournament,bookTournament}