const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Usermodel = require("./models/users");
const FavoriteModel = require("./models/favorite");
const CartModel = require("./models/cart");
const sweetRoutes = require("./routes/sweet"); 
const contactRoutes = require("./routes/contact"); 


const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/test", {
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
    await FavoriteModel.findOneAndDelete({ user: user, name: item.name });
    res.json("Item removed from favorites");
  } catch (err) {
    res.status(500).json(err);
  }
});


app.get("/getfavorites", async (req, res) => {
  try {
    const { user } = req.query;
    const favorites = await FavoriteModel.find({ user: user });
    res.json(favorites);
  } catch (err) {
    res.status(500).json(err);
  }
});


app.post("/addToCart", async (req, res) => {
  const { user, item } = req.body;

  try {
    let cart = await CartModel.findOne({ userEmail: user });

    if (!cart) {
      cart = new CartModel({ userEmail: user, items: [] });
    }

    const existingItem = cart.items.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice += item.totalPrice;
    } else {
      cart.items.push(item);
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart" });
  }
});


app.get("/getCart", async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userEmail: req.query.user });
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});


app.delete("/removeFromCart", async (req, res) => {
  const { user, item } = req.body;

  try {
    const cart = await CartModel.findOne({ userEmail: user });

    if (cart) {
      cart.items = cart.items.filter((cartItem) => cartItem.name !== item.name);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error removing item" });
  }
});


app.delete("/clearCart", async (req, res) => {
  try {
    await CartModel.findOneAndUpdate({ userEmail: req.body.user }, { items: [] });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: "Error clearing cart" });
  }
});


app.use("/api/sweet", sweetRoutes);
app.use("/api/contact", contactRoutes);

app.post("/placeorder", (req, res) => {
  const orderData = req.body;
  console.log("Order Data Received:", orderData);

  if (!orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty!" });
  }

  // Dummy success response
  res.status(200).json({ success: true, message: "Order placed successfully!" });
});

app.listen(3001, () => console.log("Server running on port 3001"));
