//======================================Connection=============================================//
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Medisafe1", {
  useNewUrlParser: true
});
const db = mongoose.connection;

db.on("error", function() {
  console.log("Mongoose connection failed!");
  console.log("____________________________________________________");
});

db.once("open", function() {
  console.log("Mongoose connection initiated successfully!");
  console.log("____________________________________________________");
});

//========================================User Schema===============================================//
let userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  measurement:[{ bloodSugar: Number, date: Date, status: String}],
  medication:[{ medName : String , date: Date , time: Date}],
  note:[{description: String , date: { type: Date, default: Date.now }
  }]
});

let Users = mongoose.model("users", userSchema);

//=========================================GET=================================================//
let getDate = callBack => {
  console.log("GET Data FROM DATABASE");
  Users.find({}, function(err, docs) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("DOCS:", docs);
    callBack(docs);
  });
};

let getUser = (cb, object) => {
  // console.log("From Server", object.email);
  Users.findOne({ email: object.email, password: object.password }, function(
    err,
    docs
  ) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("DOCS FIND ONE:", docs);
    cb(docs);
  });
};

let registUser = (cb, obj) => {
  Users.insertMany(
    [
      {
        username: obj.username,
        email: obj.email,
        password: obj.password,
        age: obj.age,
        gender: obj.gender
      }
    ],
    function(err, newUser) {
      if (err) {
        console.log("err", err);
      }
      console.log("newUser:", newUser);
      cb(newUser);
    }
  );
};
let getMedic = (cb, box) => {
  console.log("boxxxxxx :", box.id);
  Users.findOne({ _id: box.id }, function(err, docsFind) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("docsFindddddddd :", docsFind);
    let date = Date.parse(box.datetime);
    // let time = Date.parse(box.time);

    // console.log(typeof date);
    let y = {
      medname: box.medname,
      datetime: date
    };
    // delete box.id
    // console.log("JSON PARSE: ", JSON.stringify(y))
    docsFind.medication.push(y);
    docsFind.save(function(err, docsSave) {
      if (err) {
        console.log("ERR:", err);
      }
      cb(docsSave);
    });
  });
};

let measurmentUser = (cb,obj)=>{
  console.log('cb from db',cb)
  console.log('obj from db',obj)

  Users.findOne({_id:obj.id}, function(err,addMeasr){
    if (err){
      console.log('err', err);
    }
    // let date = Date.parse(box.datetime);
    console.log('addMeasr :', addMeasr);
    let measr ={
      bloodSugar:obj.bloodSugar,
      date:obj.date
    };
    // addMeasr.measurement.push(JSON.stringify(measr));
    addMeasr.measurement.push(measr);
    addMeasr.save(function(err,measrSave){
      if(err){
        console.log('err', err)
      }
      cb(measrSave);
    });
  });
};
//=====================================MODULE EXPORTS=============================================//
module.exports = {
  getDate,
  registUser,
  getUser,
  measurmentUser,
  getMedic
};
