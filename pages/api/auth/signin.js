import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
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

        if(!user) {
            return res.status(404).json({message:"User not found"})
        }

        

    } catch (error) {
        // Codes
    }
}
export default handler;