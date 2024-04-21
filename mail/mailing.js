const Hr = require("../schema/hr");
const Task = require("../schema/task");
const { User } = require("../schema/user");

schedule.scheduleJob('* * * * *',async ()=>{
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
            from: 'youremail@gmail.com',
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

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abpa4402@gmail.com',
      pass: 'iiab wwcc fmei qzki'
    }
  });
  
  var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'rudrapratap16005@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });