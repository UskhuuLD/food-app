import { Context } from "hono";
import { randomBytes } from "crypto";
import { connectDb } from "../lib/connectDb.js";
import { UserModel } from "../model/user.model.js";
import { hashPassword, verifyPassword } from "../lib/hash.js";
import { signToken } from "../lib/jwt.js";

// POST /auth/sign-up
export const signUp = async (c: Context) => {
  await connectDb();
  const input = await c.req.json();
  const { email, password, phoneNumber, address } = input;

  if (!email || !password) {
    return c.json({ message: "email and password required" }, 400);
  }

  const existing = await UserModel.findOne({ email });
  if (existing) {
    return c.json({ message: "user already exists" }, 409);
  }

  const user = await UserModel.create({
    email,
    password: hashPassword(password),
    phoneNumber,
    address,
  });

  const token = signToken({ userId: String(user._id), role: user.role });

  return c.json({
    message: "successfully signed up",
    token,
    user: { _id: user._id, email: user.email, role: user.role },
  });
};

// POST /auth/sign-in
export const signIn = async (c: Context) => {
  await connectDb();
  const { email, password } = await c.req.json();

  const user = await UserModel.findOne({ email });
  if (!user || !verifyPassword(password, user.password)) {
    return c.json({ message: "invalid email or password" }, 401);
  }

  const token = signToken({ userId: String(user._id), role: user.role });

  return c.json({
    message: "successfully signed in",
    token,
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
      address: user.address,
      phoneNumber: user.phoneNumber,
    },
  });
};

// POST /auth/reset-password-request
export const resetPasswordRequest = async (c: Context) => {
  await connectDb();
  const { email } = await c.req.json();
  const user = await UserModel.findOne({ email });

  if (user) {
    const resetToken = randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();
    // TODO: resetToken агуулсан линкийг имэйлээр илгээх
    console.log(`Reset password token for ${email}: ${resetToken}`);
  }

  return c.json({
    message: "if the email exists, a reset link has been sent",
  });
};

// GET /auth/verify-reset-password-request?token=...
export const verifyResetPasswordRequest = async (c: Context) => {
  await connectDb();
  const token = c.req.query("token");
  if (!token) return c.json({ message: "token required" }, 400);

  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    return c.json({ valid: false, message: "invalid or expired token" }, 400);
  }

  return c.json({ valid: true, message: "token is valid" });
};

// POST /auth/reset-password
export const resetPassword = async (c: Context) => {
  await connectDb();
  const { token, password } = await c.req.json();
  if (!token || !password) {
    return c.json({ message: "token and password required" }, 400);
  }

  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpiresAt: { $gt: new Date() },
  });

  if (!user) {
    return c.json({ message: "invalid or expired token" }, 400);
  }

  user.password = hashPassword(password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiresAt = undefined;
  await user.save();

  return c.json({ message: "password successfully reset" });
};
