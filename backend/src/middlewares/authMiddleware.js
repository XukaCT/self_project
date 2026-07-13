import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Authoziation 
export const protectedRoute = (req, res, next) => {
    try{
        // Get the token from the request header
        const authheader = req.headers["authorization"];
        const token = authheader && authheader.split(" ")[1]; 
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // check if the token is valid and not expired
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
            if (err) {
                console.error("Error while verifying JWT token in middleware:", err);
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            // find the user in the database using the userId from the token
            const user = await User.findById(decodedUser.userId).select("-hashedPassword");
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // attach the user object to the request object for further use in the route handler
            req.user = user;
            next();
        });
    }
    catch(error) {
        console.error("Error while authorizing JWT token in middleware:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}