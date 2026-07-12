import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../models/Session.js";

const Access_Token_TTL = "30m"; 
const Refresh_Token_TTL = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds

export  const signUp = async (req, res) => {
    try{
        const { username, password, email, firstName, lastName } = req.body;
         if (!username || !password || !email || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required" });
        }

         const duplicate = await User.findOne({ username });
        if (duplicate) {
            return res.status(409).json({ message: "Username already exists" });
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
        return res.sendStatus(204);
    } catch (error) {
       return res.status(500).json({ message: "Error when creating user", error });
    }
};

export const signIn = async (req, res) => {
    try {
        // Take input from request body
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        
        // take hashed password from database and compare with the password from request body
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // checking if the password matches the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // If match, create access token with JWT
        const accessToken = jwt.sign(
            { userId: user._id},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: Access_Token_TTL }
        );
        // create refresh token with JWT
        const refreshToken = crypto.randomBytes(64).toString("hex");
        
        // create session to store refresh token in database
        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + Refresh_Token_TTL),
        });

        // send refresh token in cookie and access token in response body
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none", // for backend and frontend on different domains, if on the same domain, set to "strict"
            maxAge: Refresh_Token_TTL,
        });
        
        // send access token in response body
        return res.status(200).json({ message: "Signin successful", accessToken });
    } catch (error) {
        console.error("Error during sign-in:", error);
        return res.status(500).json({ message: "Error when signing in", error });
    }
};