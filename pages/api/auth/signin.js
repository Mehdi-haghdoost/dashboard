import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateToken, verifyPassword } from "@/utils/auth";
const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return false;
    }

    try {
        connectToDB();

        const { identifirer, password } = req.body;

        if (!identifirer.trim() || !password.trim()) {
            return res.status(422).json({ message: "Data is not valid !!" })
        }

        const user = await UserModel.findOne({
            $or: [{ username: identifirer }, { email: identifirer }]
        })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isValidPassword = await verifyPassword(password, user.password)

        if (!isValidPassword) {
            return res.status(422).json({ message: "Username or Password is not correct" })
        }

        const token = generateToken({ email: user.email })


        return res
            .setHeader('Set-Cookie', serialize('token', token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24
            }))
            .status(200)
            .json({ message: "User Logged in successfully :))" })

    } catch (error) {
        return res.status(500)
            .json({ message: "Unknow Internal Server Error !!", error: err })
    }
}
export default handler;