import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "90d",
    // expiresIn: "300s", // 300sec
  });

  // Set JWT as HTTP-Only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    // maxAge: 300000, // 300 seconds
  });
};

export default generateToken;
