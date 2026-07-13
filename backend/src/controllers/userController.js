export const authMe = async (req, res) => {
  try {
    const user = req.user; // from the protectedRoute middleware

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error while fetching authenticated user:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};