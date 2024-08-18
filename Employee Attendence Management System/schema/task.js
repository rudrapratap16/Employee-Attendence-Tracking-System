const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    
    tasks:[{task: String, status: String,file:String,deadline:String, remarks: String}],
    madeBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task