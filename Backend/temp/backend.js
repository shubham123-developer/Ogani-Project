const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
mongoose.connect("mongodb://127.0.0.1:27017/practiceogani")
    .then(() => console.log("Connected!"))
    .catch(err => console.log(err));


const app = express();
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

const productModel = mongoose.model("products", productSchema);


const cartSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    quantity: {
        type: Number,
        default: 1
    }
});

const cartModel = mongoose.model("carts", cartSchema);

const uploadImages = multer(
    {
        storage: multer.diskStorage(
            {
                destination: "./uploads",
                filename: (req, file, cb) => cb(null, Math.floor(Math.random() * 1000000) + "-" + Math.random() * 1000000 + path.extname(file.originalname))
            })
    }

);


app.post("/product", uploadImages.array("images", 5), async (req, res) => {
    try {
        if (!req.files) return res.status(400).json({ message: "No files uploaded!" });
        const { title, description, price, category } = req.body;
        const images = req.files.map(file => file.filename);

        const product = await productModel.create({ title, description, price, category, images });
        res.json({ message: product });
    } catch (error) {
        res.status(400).json({ message: error });
    }

});

app.post("/cart", express.json(), async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const foundItem = await cartModel.findOne(
            {
                userId: new mongoose.Types.ObjectId(userId),
                productId: new mongoose.Types.ObjectId(productId)
            }
        );
        if(foundItem)
        {
            foundItem.quantity = foundItem.quantity+1;
            await foundItem.save();
            res.json({message: "Quantity Updated!"});
        }else{
            
        const CartItem = await cartModel.create({
            userId: new mongoose.Types.ObjectId(userId),
            productId: new mongoose.Types.ObjectId(productId)
        });

        res.status(201).json({ cartItem: CartItem });
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get("/cart", async (req, res) => {
    try {
        const allItems = await cartModel.aggregate([
            {
                $lookup: {
                    "from": "users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "User"
                }
            },

            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "Product"
                }
            },

            {
                $project: {
                    quantity: 1,
                    "product": { $arrayElemAt: ["$Product.title", 0] },
                    "user": { $arrayElemAt: ["$User.name", 0] }
                }
            }
        ]);
        res.status(200).json({ allItems });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
})


app.post("/signup", express.json(), async (req, res) => {
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


app.post("/login", express.json(), async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await userModel.findOne({ email });
        if (userFound == null) return res.status(400).json({ message: "Invalid credentials!" });

        const correctPass = await bcrypt.compare(password, userFound.password);
        if (!correctPass) return res.status(400).json({ message: "Invalid credentials!" });

        return res.status(200).json({ message: "Logged In!" });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
});

app.listen(8080, () => console.log("Server running on port 8080"));




