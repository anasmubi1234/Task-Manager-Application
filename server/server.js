const express = require("express");
const cors = require("cors");
const mongoosh = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoosh
  .connect("mongodb://127.0.0.1:27017/taskDetails")
  .then(console.log("mongodb connected"));

const taskschema = new mongoosh.Schema({
  title: { type: String },
  description: { type: String },
  priority: { type: String },
  status:{type:String,default:"pending"},
  createdAt: {type: Date, default: Date.now},
  // isdeleted:{type:Boolean,default:false}
});

const db = mongoosh.model("details", taskschema);


app.post("/taskDetails", async (req, res) => {
  let response = await db.create(req.body);
  res.status(201).send({ mes: "student created", response });
});

app.get("/taskDetails", async(req,res)=>{
  const response=await db.find();
  res.send(response);
  // console.log(response.data); 
});

app.put("/taskDetails/:id", async (req, res) => {
  const response = await db.findByIdAndUpdate(req.params.id,req.body);
  res.json({ message: "Updated", response });
});

app.patch("/taskDetails/status/:id", async (req, res) => {
  const response = await db.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json({ message: "Status Updated", response });
});

app.delete("/taskDetails/:id", async (req, res) => {
  const response = await db.findByIdAndDelete(req.params.id,{});
  res.json({ message: "deleted", response });
});

app.listen(2004, () => {
  console.log("server listining")
});

