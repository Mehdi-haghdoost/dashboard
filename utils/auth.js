import { hash } from "bcrypt";

const hashPasword = async (password) => {

    const hashedPassword = await hash(password, 12);

    return hashedPassword;
}
export { hashPasword };