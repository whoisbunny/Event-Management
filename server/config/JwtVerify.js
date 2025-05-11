import jwt from "jsonwebtoken";
import USER from "../models/user.model.js";

export const generateAuthToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
  return token;
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export function calculateExpiryDate() {
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 48);
  return expiryDate;
}

export const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await USER.findById(userId);

    const token = generateAuthToken(userId);
    const refreshToken = generateRefreshToken(userId);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { token, refreshToken };
  } catch (error) {
    console.log(error);
  }
};
