import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export  const signup = async (req, res) => {
    try{
        const { username, password, email, firstName, lastName } = req.body;
         if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // salt = 10

        // Create a new user object
         await User.create({
        username,
        hashedPassword,
        email,
        displayName: `${firstName} ${lastName}`,
        });

        // Respond
        return res.status(204);
    } catch (error) {
       return res.status(500).json({ message: "Error when creating user", error });
    }
};