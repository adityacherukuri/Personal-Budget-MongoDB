const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const mongoose = require('mongoose');

let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const budgetModel = require('./models/schema');

let url = 'mongodb://localhost:27017/personal_budget';

app.post("/mybudget",upload.array(), (request, response)=> {
  let newData={
      "title":request.body.title,
      "budget": request.body.budget,
      "color":request.body.color
      };
  //response.send('Result : '+newData.title);
  mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
      .then(()=>{
          console.log("Connected to the database...")
           // Insert operation
          budgetModel.insertMany(newData)
              .then((data)=>{
                  //console.log(data)
                  response.send("Data inserted successfully into database");
                  mongoose.connection.close()
              })
              .catch((connectionError)=>{
                  console.log(connectionError)
              })
      })
      .catch((connectionError)=>{
          console.log(connectionError)
      })
});

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })
      .then(()=>{
          console.log("Connected to database")
         // List all entries
          budgetModel.find({})
                  .then((data)=>{
                      app.get('/budget',(req,res)=>{
                          res.json(data);
                      });
                      mongoose.connection.close()
                  })
                  .catch((connectionError)=>{
                      console.log(connectionError)
                  })
      })
      .catch((connectionError)=>{
          console.log(connectionError)
      })

//app.use(cors());
 app.use("/", express.static("public"));
const budget = require('./budget.json')
// const budget = {
//   myBudget: [
//     {
//       title: "Eat Out",
//       budget: 150,
//     },
//     {
//       title: "Rent",
//       budget: 500,
//     },
//     {
//       title: "Groceries",
//       budget: 200,
//     },
//   ],
// };

// app.get("/budget", (req, res) => {
//   res.json(budget);
// });

// app.get("/budgetTwo", (req, res) => {
//   res.sendFile(
//     "C:/Users/kotap/Desktop/NBAD/Week03/personal-budget/budget.json"
//   );
// });

app.listen(port, () => {
  console.log(`app served at http://localhost:${port}`);
});
