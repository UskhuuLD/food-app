import { model, Schema } from "mongoose";

export const USER_ROLES = ["USER", "ADMIN"] as const;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Nuuts ug сэргээх токен
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", UserSchema);
