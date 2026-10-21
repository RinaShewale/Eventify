import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const googleCallback = async (req, res) => {
  try {
    const { id, displayName, emails, photos } = req.user;

    const email = emails?.[0]?.value;
    const avatar = photos?.[0]?.value || "";

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google email not found"
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: id,
        name: displayName,
        email,
        avatar
      });
    } else {
      user.googleId = id;
      user.name = displayName;
      user.avatar = avatar;

      await user.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
    res.redirect(`${frontendUrl}/auth/callback#token=${encodeURIComponent(token)}`);
  } catch (error) {
    console.error("Google Callback Error:", error);

    res.status(500).json({
      success: false,
      message: "Google authentication failed"
    });
  }
};

export const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
      }
    });
  } catch (error) {
    console.error("Get Me Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get user"
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    console.error("Logout Error:", error);

    res.status(500).json({
      success: false,
      message: "Logout failed"
    });
  }
};