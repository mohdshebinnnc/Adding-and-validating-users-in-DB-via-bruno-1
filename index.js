const express = require('express');
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")


const app = express();
const port = 3010;
app.use(express.json());

mongoose.connect("mongodb+srv://mohammed782:nhdbefqebawhsJBCkndejhijhbkjr@cluster0.enuvl.mongodb.net/login", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


app.get('/register', async(req, res) => {
  try {
    const product = await User.find();
    res.send({ "message": "Successfully retrieved the data from the database"});
    console.log(product)
} catch (error) {
    console.error(error); 
    res.status(500).send({ "Error-message": "Failed to retrieve products" });
}
});

app.post("/register",async(req,res)=>{
  const { username, email, password } = req.body;
  

  if (!username || !email || !password) {
    return res.status(400).json({message: "All fields are required" });
  }

  try {

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser=new User({ username, email, password: hashedPassword })
    await newUser.save()
    res.status(201).json({message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({message: "Error registering user", error })
  }

  
})


const userSchema=new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const User = mongoose.model("User", userSchema);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
