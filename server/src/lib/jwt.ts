import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export type JwtPayload = { userId: string; role: string };

const encode = (input: string) => Buffer.from(input).toString("base64url");

// Hereglegch tanih энгийн HS256 JWT (гадны сан ашиглалгүй)
export const signToken = (
  payload: JwtPayload,
  expiresInSec = 60 * 60 * 24 * 7
) => {
  const now = Math.floor(Date.now() / 1000);
  const header = encode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = encode(
    JSON.stringify({ ...payload, iat: now, exp: now + expiresInSec })
  );
  const data = `${header}.${body}`;
  const signature = createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${signature}`;
};

export const verifyToken = (token: string): JwtPayload | null => {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const data = `${header}.${body}`;
  const expected = createHmac("sha256", SECRET)
    .update(data)
    .digest("base64url");
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) return null;
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
};
