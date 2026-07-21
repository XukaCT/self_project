import Friend from "../models/Friend.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";


export const sendFriendRequest = async (req, res) => {
    try{
        
    }catch(error){
        console.error("error while sending friend request", error);
        return res.status(500).json({message: "system error"})
    }
}

export const acceptFriendRequest = async (req, res) => {
    try{

    }catch(error){
        console.error("error while accepting friend request", error);
        return res.status(500).json({message: "system error"})
    }
}

export const declineFriendRequest = async (req, res) => {
    try{

    }catch(error){
        console.error("error while declining friend request", error);
        return res.status(500).json({message: "system error"})
    }
}

export const getAllFriends = async (req, res) => {
    try{

    }catch(error){
        console.error("error while retrieving friend list", error);
        return res.status(500).json({message: "system error"})
    }
}

export const getFriendRequests = async (req, res) => {
    try{

    }catch(error){
        console.error("error while getting all friend request", error);
        return res.status(500).json({message: "system error"})
    }
}