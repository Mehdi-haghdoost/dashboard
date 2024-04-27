import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { verify } from "jsonwebtoken";

const hashPasword = async (password) => {

  const hashedPassword = await hash(password, 12);

  return hashedPassword;
}

const generateToken = (data) => {
  const token = sign({ ...data }, process.env.privateKey, {
    // algorithm: ''
    expiresIn: "24h",
  });

  return token;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

const verifyToken = (token) => {
  try {
    const validationResualt = verify(token, process.env.privateKey)
    return validationResualt;
  } catch (error) {
    console.log("Verify Token Error =>", error);
    return false;
  }
}

export { hashPasword, generateToken, verifyPassword, verifyToken };