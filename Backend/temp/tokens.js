// npm install jsonwebtoken
const jwt = require("jsonwebtoken")

// secret key
// payload
// const token =jwt.sign({samose: 4, colddrink: "2-20 wali"}, "mysecretkey", {expiresIn: "1s"})
// console.log(token);

const token = ""

try {
    const payload = jwt.verify(token, "mysecfdgdfretkey");
    console.log(payload)
} catch (error) {
    console.log(error.message);
    console.log(error.name);
}


// TokenExpiredError, JsonWebtokenError

