const bcrypt = require("bcrypt");

async function hashPassword(){
    // const hashedPassword = await bcrypt.hash("1", 12);

    const correctPass  = await bcrypt.compare("1dfg", "$2b$15$Zj7oS2hBYOJ/P/XexacLMuCVvFc/GLNsy1W2EC7Y44YqFBozr8IRa")

    
    console.log(correctPass);
}

hashPassword();
