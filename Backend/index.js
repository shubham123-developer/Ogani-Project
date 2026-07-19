const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const dotenv = require("dotenv");
const Razorpay = require("razorpay");
dotenv.config();

// process.config({path: ".env"})
// console.log(process.env.RAZ_KEY_SECRET);
// console.log(process.env.RAZ_API_KEY);

mongoose.connect("mongodb://127.0.0.1:27017/ogani")
    .then(() => console.log("Connected!"))
    .catch(err => console.log(err));


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use(express.json());
app.use(cookieParser());


// min, max, maxlength, minlength, required, trim etc
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [3, "Name must contain at least 3 letters"],
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email is required"],
        validate: {
            validator: (value) => {
                const pattern = /^\w+@\w+\.[a-zA-Z]{2,}$/;
                const valid = pattern.test(value);
                return valid;
            },
            message: "Please provide a valid email address"
        },
        unique: true
    },
    phone: {
        type: String,
        trim: true,
        required: [true, "phone is required"],
        validate: {
            validator: (value) => {
                const pattern = /^\d{10}$/;
                const valid = pattern.test(value);
                return valid;
            },
            message: "Please provide a valid phone number"
        }
    },
    password: {
        type: String,
        trim: true,
        required: [true, "password is required"],
        minlength: [8, "Password must contain at least 8 characters"]
    }
});

const userModel = mongoose.model("users", userSchema);

app.use("/images", express.static("./uploads"));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome!" });
});

// title, description, price, category, images=>[string]

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    images: [String]
});

const cartSchema = new mongoose.Schema({
    userId: String,
    productId: String,
    quantity: Number,
    title: String,
    price: Number,
    image: String

});

const productModel = mongoose.model("products", productSchema);
const Cart = mongoose.model("cartItems", cartSchema)
const uploadImages = multer(
    {
        storage: multer.diskStorage(
            {
                destination: "./uploads",
                filename: (req, file, cb) => cb(null, Math.floor(Math.random() * 1000000) + "-" + Math.random() * 1000000 + path.extname(file.originalname))
            })
    }

);




// #################################### Payment

    const razorpay = new Razorpay({
        key_id: process.env.RAZ_API_KEY,
        key_secret: process.env.RAZ_KEY_SECRET
    });

    app.get("/createOrder",checkAuth,async (req, res)=>{
        try {
            const userId = req.user._id;
            const cartItems = await Cart.find({userId});
            if(!cartItems)
                return res.status(400).json({message: "Cart is empty!"});
        
        
            const cartTotal = cartItems.reduce((sum, cartItem)=>sum+cartItem.price*cartItem.quantity, 0);
            const shippingCost = 20;
            const totalAmount = cartTotal + shippingCost;

            const order = await razorpay.orders.create({amount: totalAmount*100, currency: "INR"});
            res.status(200).json({order});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Something went wrong!"});
            
        }
    })


    app.post("/verifypayment", checkAuth, async (req, res)=>{
        try {
            const {orderId, paymentId, signature}= req.body;
            const msg = orderId+"|"+paymentId;
            const expectedSignature = crypto.createHmac("sha256", process.env.RAZ_KEY_SECRET).update(msg).digest("hex");
            console.log(expectedSignature, "----",signature)
            if(signature==expectedSignature){
                res.status(200).json({message: "Payment successful!"});
            }else{
                res.status(400).json({message: "Could not verify payment!"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Something went wrong!"});
        }
    })

// ########################################




app.post("/product", uploadImages.array("images", 5), async (req, res) => {
    try {
        if (!req.files) return res.status(400).json({ message: "No files uploaded!" });
        const { title, price, description, category } = req.body;
        const images = req.files.map(file => file.filename);
        const newProduct = await productModel.create({ title, price, description, category, images });
        res.status(200).json({ message: "Product created successfully!", product: newProduct });
    } catch (error) {
        res.status(400).json({ message: "Could not create product at the moment!" });
    }
});

app.get("/product", async (req, res) => {
    try {
        // /product?id=1234
        const id = req.query.id;
        let product = await productModel.findById(id);
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
})

app.get("/products", async (req, res) => {
    try {
        const { max, min, q, category } = req.query;
        const products = await productModel.find({
            price: {
                $gte: min ?? 0,
                $lte: max ?? 1000000

            },
            $or: [{ title: { $regex: q ?? "", $options: "i" } }, { description: { $regex: q ?? "", $options: "i" } }],
            category: { $regex: category ?? "", $options: "i" }
        }).select("title price images category")
        res.status(200).json({ products });


    } catch (error) {
        res.status(500).json({ message: "Something went wrong! Please try again." });
    }
});

app.get("/cart", checkAuth, async (req, res) => {
    try {
        let userId = req.user._id;
        const cart = await Cart.find({ userId });
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
})

app.post("/cart", checkAuth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        const product = await productModel.findById(productId);
        if (!product)
            return res.status(400).json({ message: "Invalid product Id!" });
        const cartItem = await Cart.findOne({ productId, userId });

        if (!cartItem) {
            if (quantity <= 0)
                return res.status(200).json({ message: "Cart Updated!" });
            await Cart.insertOne({ productId, userId, title: product.title, price: product.price, image: product.images[0], quantity: quantity ?? 1 });
        } else {
            if (quantity == undefined) {
                cartItem.quantity = cartItem.quantity + 1;
                await cartItem.save();
            } else if (quantity <= 0) {

                if (quantity == -1 && cartItem.quantity - 1 > 0) {
                    cartItem.quantity = cartItem.quantity - 1;
                    await cartItem.save();
                } else if (cartItem.quantity + quantity <= 0) {
                    await cartItem.deleteOne();
                }

            } else {
                cartItem.quantity = cartItem.quantity + quantity;
                await cartItem.save();
            }
        }
        const cart = await Cart.find({ userId });
        return res.status(200).json({ message: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});





app.post("/signup", async (req, res) => {
    try {
        let { name, email, phone, password } = req.body; //{name: "sachin", email: "sachin@gmail.com", ...}
        password = await bcrypt.hash(password, 12);
        const newUser = await userModel.create({ name, email, phone, password });
        res.status(201).json({ message: newUser });

    } catch (error) {
        if (error.name == "ValidationError") {
            return res.status(400).json({ message: error.message });
        } else if (error.code == 11000) {
            return res.status(400).json({ message: "The email has already been taken" });
        }
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong!" });
    }
});



app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await userModel.findOne({ email });
        if (userFound == null) return res.status(400).json({ message: "Invalid credentials!" });

        const correctPass = await bcrypt.compare(password, userFound.password);
        if (!correctPass) return res.status(400).json({ message: "Invalid credentials!" });

        const token = jwt.sign({ userId: userFound._id }, "mysecretkey", { expiresIn: "90d" });

        res.cookie("jwt", token, {
            maxAge: 90 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({ message: "Logged In!", token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
});




async function checkAuth(req, res, next) {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Could not authenticate!" });
        }
        const payload = jwt.verify(token, "mysecretkey");
        const userId = payload.userId;
        const user = await userModel.findById(userId).select("name email phone");
        if (!user) {
            res.cookie("jwt", "", { maxAge: 10 * 1000, sameSite: "None" })
            return res.status(400).json({ message: "The user has been deleted!" });
        }

        req.user = user;
        next()
    } catch (error) {
        if (error.name === "JsonWebtokenError") {
            res.status(401).json({ message: "You should not be her. Please log in!" });
        } //TokenExpiredError, JsonWebtokenError
        else if (error.name == "TokenExpiredError") {
            res.cookie("jwt", "", { maxAge: 10 * 1000, sameSite: "None" })
            res.status(401).json({ message: "You should not be here. Please log in first!" });
        } else {
            console.log("While verifying token: ", error);
            res.status(500).json({ message: "Something went wrong!" });
        }
    }
}



app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: 10 * 1000, httpOnly: true, secure: true, sameSite: "none" });
    res.status(200).json({ message: "Logged out!" });
})

app.get("/profile", checkAuth, (req, res) => {
    res.json({ message: req.user });
})

// Contact

const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "somawattanisha@gmail.com",
        pass: "ydxe vyuf wwbb ncib"
    }
})

app.post("/contact", async (req, res) => {
    try {
        const { fullname, subject, email, message } = req.body;
        const customerSupportEmail = "sk0214588@gmail.com";
        await mailer.sendMail(
            {
                from: "somawattanisha@gmail.com",
                subject: "Customer Query",
                to: customerSupportEmail,
                text: `Name: ${fullname}, Subject: ${subject}, Email: ${email}\nMessage: ${message}`
            }
        );

        await mailer.sendMail({
            from: "somawattanisha@gmail.com",
            to: email,
            subject: "Ogani- Contact Form",
            text: "Thank you for contacting us! We will get back to you soon!"
        });


        res.status(200).json({ message: "Email Sent!" });

    } catch (error) {
        res.status(500).json({ message: "Could not process your request at the moment!" });
        console.log(error);
    }
})

app.listen(8080, () => console.log("Server running on port 8080"));




// Agenda ---
// SEND data to the backend from signup form and make users signup
// Try to login

