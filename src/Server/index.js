const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Usermodel = require("./models/users");
const FavoriteModel = require("./models/favorite");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to DB"))
.catch((err) => console.log(err));

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usermodel.findOne({ email });
    if (!user) return res.json("No record found");
    if (user.password !== password) return res.json("Incorrect password");
    res.json({ status: "Success", uname: user.uname });
  } catch (err) {
    res.status(500).json(err);
  }
});


app.post("/authentication", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) return res.json("Mail already exists");
    const newUser = await Usermodel.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/favorites", async (req, res) => {
  try {
    const { user, item } = req.body;
     
    if (!user || !item || !item.name) {
      return res.status(400).json({ error: "Missing user or item name" });
    }

    const existingFavorite = await FavoriteModel.findOne({ user, name: item.name });
    if (existingFavorite) {
      return res.json({ message: "Item already in favorites" });
    }

    const newFavorite = await FavoriteModel.create({
      user: user,
      name: item.name,
      image: item.image,
      price: item.price,
    });

    res.json(newFavorite);
  } catch (err) {
    console.error("Error in /favorites:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/delfavorites", async (req, res) => {
  try {
    const { user, item } = req.body;
    await FavoriteModel.findOneAndDelete({ user:user, name: item.name });
    res.json("Item removed from favorites");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/getfavorites", async (req, res) => {
  try {
    const { user} = req.query;
    const favorites = await FavoriteModel.find({ user:user });
    res.json(favorites);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
