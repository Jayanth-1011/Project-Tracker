// // utils/jwt.js
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRES_IN = "1h";

// // Generate a JWT token
// export const generateToken = (payload) => {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
// };

// // Set JWT token in cookie
// export const setTokenCookie = (res, token) => {
//   res.cookie("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     maxAge: 3600000, // 1 hour
//     sameSite: "strict",
//   });
// // 

// // Clear token cookie
// export const clearTokenCookie = (res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   });
// };
