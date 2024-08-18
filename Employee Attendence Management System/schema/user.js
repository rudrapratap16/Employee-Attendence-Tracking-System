const mongoose = require("mongoose")

const Hr = require("./hr.js")
const Task = require("./task.js")

main().then((res)=>{
    console.log("connection successful")
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ems")
}

const userSchema = new mongoose.Schema({
    name: String,
    employeeID: String,
    intime: [String],
    outtime: [String],
    email: String,
    hrobjid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hrs"
    }
})

const User = mongoose.model("User", userSchema)

module.exports = {User, Hr, Task}