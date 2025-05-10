import jwt from "jsonwebtoken";
import USER from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await USER.findById(decoded?.userId);
        if (!user) throw new Error("Invalid token");
        req.user = user;

        next();
      } else {
        return res
          .status(404)
          .json({ message: "Not authorized Token expired " });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

};

// Role-Based Access Control Middleware
export const verifyRole =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      console.log("problem in back auth");
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }
    next();
  };
