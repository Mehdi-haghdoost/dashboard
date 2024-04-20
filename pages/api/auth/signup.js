import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { hashPasword } from "@/utils/auth";

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return false;
    }

    try {
        connectToDB();

        const { firstname, lastname, username, email, password } = req.body;

        // validation
        if (!firstname.trim() || !lastname.trim() || !username.trim() || !email.trim() || !password.trim()) {
            return res.status(422)
                .json({ message: "Data is not valid !!" })
        }

        // isUserExist
        const isUserExist = await UserModel.findOne({
            $or: [{ username }, { email }],
        })

        if (isUserExist) {
            return res
                .status(422)
                .json({ message: "This username or email already exist" })
        }

        // HashPassword
        const hashedPassword = await hashPasword(password)
        // GenerateToken
        // Create

        await UserModel.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            role: "USER"
        })
        return res.status(201)
            .json({ message: "User created successfully :))" })

    } catch (err) {
        return res.status(500)
            .json({ message: "Unknow Internal Server Error !!" })
    }
}
export default handler;