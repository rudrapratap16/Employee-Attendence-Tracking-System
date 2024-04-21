const mongoose = require("mongoose")

const hrSchema = new mongoose.Schema({
    name : String,
    hrID: String,
    employeeID : {
        type: [String]
    }
})

const Hr = mongoose.model("Hr", hrSchema)

module.exports = Hr