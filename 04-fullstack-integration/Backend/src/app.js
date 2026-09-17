const express = require("express")
const app = express()
app.use(express.json())
const noteModel = require("./models/note.model")

app.post('/api/notes',async (req,res)=>{
    const {title , description} = req.body;

    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message : "Note Created Successfully",
        note
    })
})



module.exports = app