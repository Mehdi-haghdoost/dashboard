import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { generateToken, hashPasword } from "@/utils/auth";
import { serialize } from "cookie";
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

        // HashPasword
        const hashedPassword = await hashPasword(password)


        // GenerateToken
        const token = generateToken({ email });
        console.log(token);
        // Create

        const users = await UserModel.find({});

        await UserModel.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPassword,
            role: users.length > 0 ? "USER" : "ADMIN",
        });


        return res
            .setHeader('Set-Cookie', serialize('token', token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24
            }))
            .status(201)
            .json({ message: "User created successfully :))" })

    } catch (err) {
        return res.status(500)
            .json({ message: "Unknow Internal Server Error !!", error: err })
    }
}
export default handler;