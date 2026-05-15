const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)

.then(() => {
    console.log("MongoDB Connected");
})

.catch((err) => {
    console.log("MongoDB Error:", err);
});



// USER SCHEMA

const UserSchema = new mongoose.Schema({

    username: String,

    email: String,

    password: String
});

const User = mongoose.model(
    "User",
    UserSchema
);



// PRODUCT SCHEMA

const ProductSchema = new mongoose.Schema({

    name: String,

    price: Number
});

const Product = mongoose.model(
    "Product",
    ProductSchema
);



// CART SCHEMA

const CartSchema = new mongoose.Schema({

    productName: String,

    price: Number
});

const Cart = mongoose.model(
    "Cart",
    CartSchema
);



// REGISTER

app.post("/register", async (req, res) => {

    try {

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const user = new User({

            username: req.body.username,

            email: req.body.email,

            password: hashedPassword
        });

        await user.save();

        res.json({
            message: "User Registered"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Registration Error"
        });
    }
});



// LOGIN

app.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({

            email: req.body.email
        });

        if (!user) {

            return res.json({
                message: "User Not Found"
            });
        }

        const isMatch = await bcrypt.compare(

            req.body.password,

            user.password
        );

        if (!isMatch) {

            return res.json({
                message: "Wrong Password"
            });
        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET
        );

        res.json({

            message: "Login Successful",

            token
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Login Error"
        });
    }
});



// PRODUCTS

app.get("/products", async (req, res) => {

    const products = [

        {
            name: "Laptop",
            price: 50000
        },

        {
            name: "Phone",
            price: 20000
        },

        {
            name: "Headphones",
            price: 3000
        }
    ];

    res.json(products);
});



// ADD TO CART

app.post("/cart", async (req, res) => {

    try {

        const cartItem = new Cart({

            productName: req.body.productName,

            price: req.body.price
        });

        await cartItem.save();

        res.json({
            message: "Added To Cart"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Cart Error"
        });
    }
});



// GET CART

app.get("/cart", async (req, res) => {

    const items = await Cart.find();

    res.json(items);
});



app.get("/", (req, res) => {

    res.send("Backend Running");
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);
});