const express = require("express")
const path = require("path")
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const { faker } = require('@faker-js/faker');
const {User, Hr, Task} = require("./schema/user.js")
const nodemailer = require('nodemailer');
const schedule = require("node-schedule")
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
      }
    })
  
const upload = multer({ storage: storage })
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use(express.static("public"))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
// app.set(express.static(path.join(__dirname, "views")));


// Data For Testing
// Hr data
// {
//     _id: new ObjectId('661ed7b7157b6849881cead2'),
//     name: 'Eudora_Metz',
//     hrID: '1bcdd2ff-2564-43f2-a12c-217ef3a7a853',
//     employeeID: [
//       'bb6f7fad-2bcb-4d75-84ce-83e634c33630',
//       '55b5a902-1286-4610-a40a-a1de48da4a79',
//       'c4b3fefe-00f2-4661-bff1-d180214db982',
//       '39a665b0-21f1-42b9-99d6-263408d24d29',
//       '27a57410-7773-4927-a7f7-043993c078b8',
//       '8780ee99-8dfd-47a2-b39e-a54feff36bb3',
//       'a98ceaf4-c4a5-4181-8e03-2ff195c2df48',
//       '1fd8d305-2006-458d-b052-c127c321b502',
//       '21a544fe-c670-4ff1-8a3b-d9d55e6b4e97',
//       'b5dc2917-e6d7-4489-9b4c-6643c9967339'
//     ],
//     __v: 0
//   }
// _id: new ObjectId('66217c17ec536d07670182c1'),
// name: 'somethinghr',
// hrID: 'hrid',
// employeeID: [
//   '55c9b735-4bf6-41f5-ba27-529ef437f38a',
//   'c9d6c0de-22ad-4e6e-b427-2d4bd65a597a',
//   '813f68a0-026a-463b-8d61-b345d4cbecb6'
// ],

    // {
    //     _id: new ObjectId('661ed43b55cca7f66709388e'),
    //     name: 'Maxwell_Hessel33',
    //     employeeID: 'bb6f7fad-2bcb-4d75-84ce-83e634c33630',
    //     intime: [],
    //     outtime: [],
    //     __v: 0
    //   },
    //   {
    //     _id: new ObjectId('661ed43b55cca7f667093890'),
    //     name: 'Maud81',
    //     employeeID: '55b5a902-1286-4610-a40a-a1de48da4a79',
    //     intime: [],
    //     outtime: [],
    //     __v: 0
    //   },

// const date = new Date();
// const formattedDate = date.toLocaleDateString('en-GB', {
//   year: 'numeric',
//   month: '2-digit',
//   day: '2-digit'
// });

// console.log(formattedDate); 

app.get("/demo",async (req,res)=>{
    let user = await User.findOne({
        name: "Maxwell_Hessel33"
    })
    user.email = "samplexyz@gmail.com"
    user.save(user)
    console.log(user)
})

app.get("/",async (req,res)=>{
    // await User.deleteMany()
    // await Hr.deleteMany()
    // await Task.deleteMany()
    // console.log("done")
    // const date = new Date();
    // const formattedDate = date.toLocaleDateString('en-GB', {
    // year: 'numeric',
    // month: '2-digit',
    // day: '2-digit'
    
// });
    // let user = new User({
    //     name: "testing",
    //     employeeID: "id",
    //     email: "something@gmail.com",
    //     hrobjid: "66217c17ec536d07670182c1"
    // })
    console.log("Here")
    schedule.scheduleJob('0 0 1 * *',async ()=>{
        // let users = await User.find()
        let user1 = new User({
            name: "testing",
            employeeID: "id",
            email: "rudrapratap16005@gmail.com",
            hrobjid: "66217c17ec536d07670182c1"
        })
        let user2 = new User({
            name: "testing2",
            employeeID: "id2",
            email: "rudrasingh01255@gmail.com",
            hrobjid: "66217c17ec536d07670182c1"
        })
    
        await user1.save(user1)
        await user2.save(user2)
    
        let users = []
        users.push(user1)
        users.push(user2)
    
        let month = new Date()
        month = month.getMonth() + 1
        for(user of users){
            currMonth = []
            for(date of user.intime){
                let [oneDate, oneMonth, oneYear] = date.split('/')
                if(oneMonth == month && !currMonth.includes(oneDate)){
                    currMonth.push(oneDate)
                }
            }
            let length = currMonth.length
    
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'abpa4402@gmail.com',
                  pass: 'iiab wwcc fmei qzki'
                }
              });
              
              var mailOptions = {
                from: 'abpa4402@gmail.com',
                to: user.email,
                subject: 'Attendence',
                text:  `Your attendence this month was ${length}. Kindly maintain it above 75 percent.`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }
        
    })
    await User.deleteOne({
        name: "testing"
    })

    await User.deleteOne({
        name: "testing2"
    })
    
    // currMonth = []
    // for(date of user.intime){
    //     let [oneDate, oneMonth, oneYear] = date.split('/')
    //     if(oneMonth == month && !currMonth.includes(oneDate)){
    //         currMonth.push(oneDate)
    //     }
    // }
    // let length = currMonth.length
    // console.log(await User.find())
    
    

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'abpa4402@gmail.com',
//     pass: 'iiab wwcc fmei qzki'
//   }
// });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'rudrapratap16005@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

    // await user.save(user)
    // console.log(user)
    // let user = await User.findOne({name: "testing"})
    // console.log(await User.findOneAndDelete({name: "testing"}))
    // let hr = await Hr.findById("66217c17ec536d07670182c1")
    // console.log(await User.findOne({name: "testing"}))
    // hr.employeeID.push(user.employeeID)
    // await hr.save(hr)
    // let employees = await User.find()
    // console.log(employees)
    // let tasks = await Task.find()
    // let empId = []
    // for(emp of employees){
    //     empId.push(emp.id)
    // }
    // let madeByList = []
    // for(task of tasks){
    //     madeByList.push(task.madeBy)
    // }
    // for(id of empId){
    //     if(!madeByList.includes(id)){
    //         let task = new Task({
    //             madeBy: id
    //         })
    //         task.save(task)
    //     }
    // }
    // console.log("done")
    // await Task.deleteMany({})
    // console.log("Done")
    // console.log(await Hr.find())
    // for(i=0;i<50;i++){
    //     let user =new User ({
    //         name: faker.internet.userName(),
    //         employeeID: faker.string.uuid()
    //     })
    //     // let day = Math.floor((Math.random() * 31)+1)
    //     // let month = Math.floor((Math.random() * 12)+1)
    //     // user.date = `${day}/${month}/2023`
    //     await user.save(user)
    // }
    // console.log(await User.find())
    
    // let hr = new Hr({
    //     employee : "abcd"
    // })
    // await hr.save(hr)
    // console.log(await Hr.findOne({}))
    // await Hr.deleteOne({})
    // console.log("dome")
    
    // let employee = await User.find()
    // for(emp of employee){
    //     console.log('"'+emp.employeeID+'"')
    // }

    // for(i=0;i<10;i++){

        // let hr =new Hr ({
        //     name: faker.internet.userName(),
        //     employeeID: ["bb6f7fad-2bcb-4d75-84ce-83e634c33630",
        //     "55b5a902-1286-4610-a40a-a1de48da4a79",
        //     "c4b3fefe-00f2-4661-bff1-d180214db982",
        //     "39a665b0-21f1-42b9-99d6-263408d24d29",
        //     "27a57410-7773-4927-a7f7-043993c078b8",
        //     "8780ee99-8dfd-47a2-b39e-a54feff36bb3",
        //     "a98ceaf4-c4a5-4181-8e03-2ff195c2df48",
        //     "1fd8d305-2006-458d-b052-c127c321b502",
        //     "21a544fe-c670-4ff1-8a3b-d9d55e6b4e97",
        //     "b5dc2917-e6d7-4489-9b4c-6643c9967339"],
        //     hrID: faker.string.uuid()
        // })

        // await hr.save(hr)
        // console.log(await Hr.find())
        // let day = Math.floor((Math.random() * 31)+1)
        // let month = Math.floor((Math.random() * 12)+1)
        // user.date = `${day}/${month}/2023`
        // await user.save(user)
    // }
    // console.log(await Task.deleteMany())
    // let users = await User.find()
    // for(user of users){
    //     console.log('"'+user.employeeID+'"'+",")
    // }
    res.render("index1.ejs")
})



app.get("/attendence", (req,res)=>{
    res.render("index1.ejs")
})

app.get("/attendence/employee",(req,res)=>{
    res.render("index-emp.ejs")
})

app.get("/attendence/hr",(req,res)=>{
    res.render("index-hr.ejs")
})

app.post("/attendence",async (req,res)=>{
    // const date = new Date();
    // const formattedDate = date.toLocaleDateString('en-GB', {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit'
    // });

    let date = new Date()
    date = date.toLocaleString()

    let {username, empId} = req.body
    let user = await User.findOne({name : username})
    console.log(user)
    let hr = await Hr.findOne({name : username})
    if(user != null && empId == user.employeeID){
        if(user.intime.length > user.outtime.length){
            res.redirect(`/attendence/${user._id}`)
        }
        else{
            user.intime.push(date)
            await user.save()
            res.redirect(`/attendence/${user._id}`)
        }
    }
    else if(hr.hrID == empId){
        res.redirect(`/attendence/hr/${hr._id}`)
        
    }
    else{
        console.log("Wrong Name")
    }
})

app.get("/attendence/admin",(req,res)=>{
    res.render("admin/admin.ejs")
})

app.get("/attendence/admin/employee",async (req,res)=>{
    res.render("admin/employee-form.ejs")
})

app.post("/attendence/admin/employee",async (req,res)=>{
    let {name, empid, email, hrname, hrid} = req.body
    let hr = await Hr.findOne({
        name: hrname,
        hrID: hrid
    })
    if(hr != undefined){
        let user = new User({
            name: name,
            employeeID: empid,
            email: email,
            hrobjid: hr.id
        })
        await user.save(user)
        console.log(await User.findOne({name: name, employeeID: empid}))
        res.redirect(`/attendence/admin`)
    }
    else{
        let user = new User({
            name: name,
            employeeID: empid,
            email: email,
            hrobjid: new mongoose.Types.ObjectId("000000000000000000000000")
        })
        await user.save(user)
        console.log(await User.findOne({name: name, employeeID: empid}))
        res.redirect(`/attendence/admin`)
    }
})


app.get("/attendence/admin/employee/delete",async (req,res)=>{
    let users = await User.find()
    res.render("admin/admin-employee-delete.ejs", {users})
})

app.delete("/attendence/admin/employee/:empid/delete",async (req,res)=>{
    let {empid} = req.params
    let user = await User.findOne({
        _id: empid
    })
    let hr = await Hr.findById(user.hrid)
    if(hr!=null){

        hr.employeeID.forEach((obj, i)=>{
            if(obj == empid){
                hr.employeeID.splice(i, 1)
            }
        })
        await hr.save(hr)
    }
    await User.deleteOne({_id: empid})
    res.redirect("/attendence/admin")
})

app.get("/attendence/admin/hr",async (req,res)=>{
    res.render("admin/hr-form.ejs")
})

app.post("/attendence/admin/hr",async (req,res)=>{
    let {name, hrid, empids} = req.body
    empids = empids.split(',')
    let employeeid = []
    let temp=0;
    for(id of empids){
        if(await User.findOne({employeeID: id.trim()}) == undefined){
            temp = 1;
        }
        else{
            if(!employeeid.includes(id.trim())){
                employeeid.push(id.trim())
            }
        }
    }
    // 55c9b735-4bf6-41f5-ba27-529ef437f38a
    // c9d6c0de-22ad-4e6e-b427-2d4bd65a597a
    // 813f68a0-026a-463b-8d61-b345d4cbecb6
    if(temp == 0){
        let hr = new Hr({
            name: name,
            hrID: hrid,
            employeeID: employeeid
        })
        await hr.save(hr)
        res.redirect("/attendence/admin/hr")
    }
    else{
        console.log("Something Went Wrong")
    }
})

app.get("/attendence/admin/hr/form",async (req,res)=>{
    let hrs = await Hr.find()
    res.render("admin/hr_form.ejs", {hrs})
})

app.delete("/attendence/admin/hr/:hrid/delete",async (req,res)=>{
    let {hrid} = req.params
    let hr = await Hr.findOne({
        _id: hrid
    })
    hr.employeeID.forEach(async (obj,i)=>{
        let user = await User.findOne({
            employeeID: obj
        })
        user.hrID = new mongoose.Schema.Types.ObjectId("000000000000000000000000")
        await user.save(user)
    })
    await Hr.deleteOne({
        _id: hrid
    })
    res.redirect(`/attendence/admin/hr/form`)
})

app.post("/attendence/admin/hr/form",async (req,res)=>{
    let {name, hrid} = req.body
    let hr = await Hr.findOne({
        name: name,
        hrID: hrid
    })
    res.redirect(`/attendence/admin/hr/form/${hr.id}`)
})

app.get("/attendence/admin/hr/form/:hrid",async (req,res)=>{
    let {hrid} = req.params
    let hr = await Hr.findOne({
        _id: hrid
    })
    let users = await User.find({
        hrobjid:  "000000000000000000000000"
    })
    console.log(users)
    res.render("admin/hr_update.ejs", {hr, users})
})

app.delete("/attendence/admin/hr/form/:hrobjid/:empid",async (req,res)=>{
    let {hrobjid, empid} = req.params
    let hr = await Hr.findOne({
        _id: hrobjid
    })
    let user = await User.findOne({
        employeeID: empid
    })
    console.log(user)
    console.log(hr)
    if(hr.employeeID.includes(empid)!= null){
        await User.findOneAndUpdate({employeeID: empid}, {hrobjid:new mongoose.Types.ObjectId("000000000000000000000000")})
        hr.employeeID.splice(hr.employeeID.indexOf(empid), 1)
        await hr.save(hr)
        res.redirect(`/attendence/admin/hr/form/${hr.id}`)
    }
    else{
        res.redirect(`/attendence/admin/hr/form/${hr.id}`)
    }
})

app.put("/attendence/admin/hr/form/:hrobjid/:empobjid",async (req,res)=>{
    let {hrobjid, empobjid} = req.params
    let user = await User.findById(empobjid)
    let hr = await Hr.findById(hrobjid)
    user.hrobjid = new mongoose.Types.ObjectId(`${hr.id}`)
    await user.save(user)
    user = await User.findById(empobjid)
    hr.employeeID.push(user.employeeID)
    await hr.save(hr)
    console.log(await User.findOne({
        hrobjid: hr.id
    }))
    res.redirect(`/attendence/admin/hr/form/${hr.id}`)
})



app.get("/attendence/hr/:id",async (req,res)=>{
    //Hr id
    let {id} = req.params
    let hr = await Hr.findOne({_id: id})
    let tasks = await Task.find()
    let employees = []
    for(employeeId of hr.employeeID){
        let employee = await User.findOne({employeeID: employeeId})
        employees.push(employee)
        await employee.populate()
    }
    res.render("hrNew.ejs", {employees, hr, tasks})
})

app.get("/attendence/hr/:hrid/:empid/task/show",async (req,res)=>{
    let {hrid, empid} = req.params
    let tasks = await Task.findOne({
        madeBy: empid
    })
    let hr = await Hr.findById(hrid)
    let emp = await User.findOne({
        _id: empid
    })
    console.log(hr)
    res.render("hr-task.ejs", {tasks, hr, emp})
})

app.delete("/attendence/hr/:hrid/:empid/task/:taskid/show", async (req,res)=>{
    let {hrid, empid, taskid} = req.params
    // let task = await Task.findOne({
    //     madeBy: empid
    // })
    // console.log(task.tasks.indexOf({_id: taskid}))
    let tasks = await Task.findOne({madeBy: empid})
    let hr = await Hr.findById(hrid)
    let emp = await User.findOne({
        _id: empid
    })
    console.log(taskid)
    tasks.tasks.forEach((obj,i)=>{
        if(obj._id == taskid){
            // console.log("here")
            tasks.tasks.splice(i,i+1)
        }
    })
    await tasks.save(tasks, hr, emp)
    // task.tasks.forEach(async (obj,i)=>{
    //     console.log(obj)
    //     if(obj.id == taskid){
    //         console.log(obj.id)
    //         // task.tasks.splice(task.tasks.indexOf({_id: taskid}), 1)
    //         // await task.save(task)
    //     }
    // })
    // console.log(tasks)
    res.render("hr-task.ejs", {tasks})
})

app.get("/attendence/hr/:hrid/:empid/task/request",async (req,res)=>{
    let {hrid, empid} = req.params
    let tasks = await Task.findOne({
        madeBy: empid
    })
    let hr = await Hr.findOne({
        _id: hrid
    })
    let emp = await User.findOne({
        _id: empid
    })
    res.render("hr-requests.ejs", {tasks, hr,emp})
})

app.get("/attendence/hr/:hrid/task/new",async (req,res)=>{
    let {hrid} = req.params
    let hr = await Hr.findById(hrid)
    res.render("task_all.ejs", {hr})
})


app.post("/attendence/hr/:hrid/task/new",async (req,res)=>{
    let {hrid} = req.params
    let {text} = req.body
    let hr = await Hr.findById(hrid)
    for(empid of hr.employeeID){
        let user = await User.findOne({
            employeeID: empid
        })
        let task = await Task.findOne({
            madeBy: user.id
        })
        if(task!= null){
            task.tasks.push({
                task: text,
                status: "In Process"
            })
            await task.save(task)
        }
        else{
            let task = new Task({
                madeBy: user.id
            })
            task.tasks.push({
                task: text,
                status: "In Process"
            })
            await task.save(task)

        }
    }
    // console.log(await Task.find())
    res.redirect(`/attendence/hr/${hrid}`)
})

app.get("/attendence/hr/:hrid/:empid/task/new",async (req,res)=>{
    let {hrid, empid} = req.params
    let user = await User.findById(empid)
    let hr = await Hr.findById(hrid)
    res.render("task-final.ejs", {user, hr})
})

app.post("/attendence/hr/:hrid/:empid/task/new",async (req,res)=>{
    let {hrid, empid} = req.params
    let {text, deadline} = req.body
    let emp = await Task.findOne({madeBy: empid})
    let hr = await Hr.findOne({id: hrid})
    if(emp == null){
        let newTask = new Task({
            madeBy: empid
        })
        await newTask.save(newTask)
    }
    let newEmp = await Task.findOne({madeBy: empid})
    newEmp.tasks.push({task: text, status: "In Progress", deadline: deadline})
    await newEmp.save(newEmp)
    res.redirect(`/attendence/hr/${hrid}`)
})

app.delete("/attendence/hr/:hrid/:empid/task/:taskId",async (req,res)=>{
    let {hrid, empid, taskId} = req.params
    let tassk = await Task.findOne({madeBy: empid})
    tassk.tasks.forEach((obj,i)=>{
        if(obj._id == taskId){
            tassk.tasks.splice(i,i+1)
        }
    })
    await tassk.save(tassk)
    res.redirect(`/attendence/hr/${hrid}`)
})



app.get("/attendence/:id",async (req,res)=>{
    let {id} = req.params
    let user = await User.findById(id)
    let today = new Date()
    let month = today. getMonth() + 1
    let currMonth = []
    for(date of user.intime){
        let [oneDate, oneMonth, oneYear] = date.split('/')
        if(oneMonth == month && !currMonth.includes(oneDate)){
            currMonth.push(oneDate)
        }
    }
    let length = currMonth.length
    let newTask = await Task.findOne({madeBy: id})
    if(newTask == null){
        let task = new Task({
            madeBy: id
        })
        await task.save(task)
    }
    newTask = await Task.findOne({madeBy: id})
    let tasks = newTask.tasks
    res.render("employee_home.ejs", {user, length, tasks})
})

app.post("/attendence/:id/profile", async (req,res)=>{
    let {month, year} = req.body
    let {id} = req.params
    let user = await User.findById(id)
    let dates = []
    let inTimes = []
    let outTimes = []
    for(obj of user.intime){
        let [date] = obj.split(', ')
        if(date.slice(3) == `${month}/${year}`){
            dates.push(date)
            inTimes.push(obj.slice(11))
        }
    }
    for(obj of user.outtime){
        let [date] = obj.split(', ')
        if(date.slice(3) == `${month}/${year}`){
            outTimes.push(obj.slice(11))
        }
    }
    res.render("attendence.ejs", {user, inTimes, outTimes, dates})
})

app.get("/attendence/:empid/markout",async (req,res)=>{
    let {empid} = req.params
    let user = await User.findById(empid)
    let date = new Date()
    date = date.toLocaleString()
    if(user.intime.length>user.outtime.length){
        user.outtime.push(date)
        await user.save(user)
        console.log(user)
        res.redirect("/attendence")
    }
})


// Just for Changing status for 'In Progress' to 'Pending'
// app.get("/attendence/:empid/:taskid",async (req,res)=>{
//     // let {empid, taskid} = req.params
//     // let emp = await User.findById(empid)
//     // let task = await Task.findOne({madeBy: emp.id})
//     // console.log("here")
//     // task.tasks.forEach((obj,i)=>{
//     //     if(obj.id == taskid ){
//     //         obj.status = "Pending"
//     //     }
//     // })
//     // await task.save()
//     res.redirect(`/attendence/${empid}`)
// })


app.post("/attendence/:empid/:taskid", upload.single('data'),async (req,res)=>{
    let {empid, taskid} = req.params
    let user = await User.findById(empid)
    let task = await Task.findOne({
        madeBy: empid
    })
    task.tasks.forEach((obj)=>{
        if(obj.id == taskid){
            obj.status = "Pending"
            obj.file = req.file.path
        }
    })
    await task.save(task)
    res.redirect(`/attendence/${empid}`)
})

app.get("/attendence/:empid/history",async (req,res)=>{
    let {empid} = req.params
    let user = await User.findOne({
        _id: empid
    })
    let dates = []
    let inTimes = []
    let outTimes = []
    for(obj of user.intime){
        let [date] = obj.split(', ')
            dates.push(date)
            inTimes.push(obj.slice(11))
    }
    for(obj of user.outtime){
        let [date] = obj.split(', ')
            outTimes.push(obj.slice(11))
    }
    res.render("history.ejs", {user, dates, inTimes, outTimes})
})

app.post("/attendence/:empid/history/month",async (req,res)=>{
    let {empid} = req.params
    let {month, year} = req.body
    let user = await User.findOne({
        _id: empid
    })

    let dates = []
    let inTimes = []
    let outTimes = []
    for(obj of user.intime){
        let [date] = obj.split(', ')
        if(date.slice(3) == `${month}/${year}`){
            dates.push(date)
            inTimes.push(obj.slice(11))
        }
    }
    for(obj of user.outtime){
        let [date] = obj.split(', ')
        if(date.slice(3) == `${month}/${year}`){
            outTimes.push(obj.slice(11))
        }
    }

    res.render("history.ejs", {user, dates, inTimes, outTimes})

})

app.get('/attendence/hr/:hrid/:empid/task/:taskid/download',async (req,res)=>{
    let {hrid, empid, taskid} = req.params
    let task = await Task.findOne({
        madeBy: empid
    })
    task.tasks.forEach((obj)=>{
        if(obj.id == taskid){
            res.download(obj.file)
        }
    })
})

app.get("/attendence/hr/:hrid/:empid/task/:taskid/approve",async (req,res)=>{
    let {hrid, empid, taskid} = req.params
    let taskObj = await Task.findOne({madeBy: empid})
    for(task of taskObj.tasks){
        if(task.id == taskid){
            task.status = "Approved"
            // More functions for approval like notifications to be added
        }
    }
    await taskObj.save(taskObj)
    res.redirect(`/attendence/hr/${hrid}`)
})

app.get("/attendence/hr/:hrid/:empid/task/:taskid/reject",async (req,res)=>{
    let {hrid, empid, taskid} = req.params
    let taskObj = await Task.findOne({madeBy: empid})
    for(task of taskObj.tasks){
        if(task.id == taskid){
            task.status = "Rejected"
            // More functions for approval like notifications to be added
        }
    }
    await taskObj.save(taskObj)
    res.redirect(`/attendence/hr/${hrid}`)
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})