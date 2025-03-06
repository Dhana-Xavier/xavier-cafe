const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const Usermodel = require('./models/users')
const FavoriteModel = require('./models/favorite')

const app = express()
app.use(express.json())


app.use(cors())
mongoose.connect("mongodb://localhost:27017/test")
.then(() => {
  console.log('Connected DB..');
})
.catch((err) => {
  console.log(err);
})


app.post("/login",(req,res) =>{
  const{email,password}= req.body;
  Usermodel.findOne({email:email})
  .then(users=>{
    if(users){
    if(users.password==password){
      res.json({status:"Success",uname:users.uname});
    }
    else res.json("Incorrect password");
  }
  else res.json("no record exited");
})
.catch(err => console.log(err))
})

app.post("/Authentification",(req,res)=>{
  const {name,email,password} = req.body;
  Usermodel.findOne({email:email})
  .then(user=>{
    if(user){
      res.json("Mail already Exist");
    }
    else{
    Usermodel.create(req.body)
      .then(users => res.json(users))
      .catch(err => res.json(err))
    }
  })
})




app.post("/favorites", (req, res) => {
  const { userId, item } = req.body;

  FavoriteModel.findOne({ userId, itemId: item.itemId })
      .then(favorite => {
          if (favorite) {
              res.json("Item already in favorites");
          } else {
              FavoriteModel.create({ userId, ...item })
                  .then(fav => res.json(fav))
                  .catch(err => res.json(err));
          }
      })
      .catch(err => res.json(err));
});

// Remove from Favorites
app.delete("/favorites", (req, res) => {
  const { userId, itemId } = req.body;

  FavoriteModel.findOneAndDelete({ userId, itemId })
      .then(() => res.json("Item removed from favorites"))
      .catch(err => res.json(err));
});

// Get User Favorites
app.get("/favorites/:userId", (req, res) => {
  const { userId } = req.params;

  FavoriteModel.find({ userId })
      .then(favorites => res.json(favorites))
      .catch(err => res.json(err));
});


app.listen(3001,() =>{
    console.log("server run");
})                                                                                                            
