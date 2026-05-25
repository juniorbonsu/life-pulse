const prisma = require('../lib/prisma');
require('dotenv').config();

const checkin = async(req, res) => {
   //morningPlan and eveningNote are both optional fields
   
    const {morningPlan, eveningNote, ratings} = req.body

    if(!ratings || ratings.length == 0) {
        return res.status(400).json({message: 'Ratings field not provided. Please try again.'})
    }

    try{
            const dailyLog = await prisma.dailyLog.up({
            data: {
                morningPlan, 
                eveningNote, 
                userId: req.user.id
            }

            
        })

        for (const rating of ratings) {
            await prisma.areaRating.create({
                data: {
                    logId: dailyLog.id,
                    area: rating.area,
                    score: rating.score
                }
            })
        }

        return res.status(201).json(dailyLog)
    } catch (er){
        return res.status(500).json("Server error: " + er.message)
    }




}

module.exports = checkin