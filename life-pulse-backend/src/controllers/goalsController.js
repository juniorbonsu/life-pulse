const prisma = require('../lib/prisma');
require('dotenv').config();

const addGoal = async(req, res) => {
    const {area, title, dueDate} = req.body

    if(!area || !title){
        return res.status(400).json({message: "Field not provided. Please try again"})
    }

    const curIsoDate = new Date().toISOString()

    if (dueDate && dueDate < curIsoDate){
        return res.status(400).json({message: "Due date cannot be in the past. Please try again"})
    }

    try {
        const goal = await prisma.goal.create({
            data: {
                area,
                title, 
                dueDate, 
                userId: req.user.id
            }
        })

        return res.status(200).json(goal)

    } catch(er){
        return res.status(500).json("Server error: " + er.message)
    }
}

const getGoals = async(req, res) => {
    //all the request shouldn have is the user id to map to all the goals
    //user id comes form req.user.id
    //all logic should be directly availabel from the backend

    try {
        const goals = await prisma.goal.findMany({
            where: {userId: req.user.id}
        })

        return res.status(201).json(goals)
    } catch(er){
        return res.status(500).json("Server error: " + er.message)
    }
}

const updateGoal = async(req, res) => {
    const {area, title, dueDate} = req.body
    const goalId = req.params.id

    try{
         //need to check if the goalid belongs to the user
        const goal = await prisma.goal.findUnique({
            where: {
                userId: req.user.id,
                id: goalId
            }
        })
        
        if(!goal){
            return res.status(404).json("Goal not found. Please try again.")
        }

        const curIsoDate = new Date().toISOString()
        
        if (dueDate && dueDate < curIsoDate){
            return res.status(400).json({message: "Due date cannot be in the past. Please try again"})
        }
        
        const update = await prisma.goal.update({
            where: {
                userId: req.user.id,
                id: goalId 
            },
            data: {
                area: area ?? prisma.skip,
                title: title ?? prisma.skip,
                dueDate: dueDate ?? prisma.skip
            }
        })

        return res.status(200).json(update)
    } catch(er){
        return res.status(500).json("Server error: " + er.message)
    }


}

const deleteGoal = async(req, res) => {
    //just need goalid and userid
    //need to confirm the goalid belongs to the user
        //and if so delete!!!!

    const goalId = req.params.id

    try {
         //need to check if the goalid belongs to the user
        const goal = await prisma.goal.findUnique({
            where: {
                userId: req.user.id,
                id: goalId
            }
        })

        if(!goal){
            return res.status(404).json("Goal not found. Please try again.")
        }

        const deleteGoal = await prisma.goal.delete({
            where: {
                userId: req.user.id, 
                id: goalId
            }
        })

        return res.status(200).json("Goal successfully deleted.")

    } catch(er){
        return res.status(500).json("Server error: " + er.message)
    }
    
}

module.exports = {addGoal, getGoals, updateGoal, deleteGoal}