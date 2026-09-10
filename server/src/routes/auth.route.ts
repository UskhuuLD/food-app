import { Hono } from "hono";
import {
  signUp,
  signIn,
  resetPasswordRequest,
  verifyResetPasswordRequest,
  resetPassword,
} from "../controllers/auth.controller.js";

const authRoute = new Hono();

authRoute.post("/sign-up", signUp);
authRoute.post("/sign-in", signIn);
authRoute.post("/reset-password-request", resetPasswordRequest);
authRoute.get("/verify-reset-password-request", verifyResetPasswordRequest);
authRoute.post("/reset-password", resetPassword);

export default authRoute;
