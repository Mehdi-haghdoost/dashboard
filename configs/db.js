const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            return true
        } else {
            await mongoose.connect("mongodb://localhost:27017/next-auth")
            console.log("connect to db successfully :))");
        }
    } catch (err) {
        console.log("Error has occured =>", err);
    }
}

export default connectToDB;