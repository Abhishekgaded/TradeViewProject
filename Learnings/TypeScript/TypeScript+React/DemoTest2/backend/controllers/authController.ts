import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from 'express';
import { hash } from "crypto";

const prisma = new PrismaClient();
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // console.log(req.body, 'Request body');
  try {

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await prisma.user.findUnique({ where: { email } });

    // console.log(user, '--------user')

    if (!user || user === null) return res.status(401).json({ message: "User not found or is null" });

    const valid = await bcrypt.compare(password, user.password);
    // console.log(await bcrypt(user.password), '------------- decrypted password')
    console.log(valid, '----------valid');
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    return res.json({
      message: "Login successful",
      accessToken,
      role: user.role,
    });

  } catch (error) {
    console.log(error, 'Error in login authController')
    throw error;
  }
};



export const refresh = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token)
    return res.status(401).json({ message: "No refresh token" });

  try {
    // Decode refresh token
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload & { id: string };

    // Issue new access token
    const newAccess = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '15m' }
    );

    return res.json({ accessToken: newAccess });

  } catch (error) {
    return res.status(403).json({ message: "Invalid Refresh Token" });
  }
};



export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
  return res.json({ message: 'Logged Out' })

}

export const register = async (req: Request, res: Response) => {

  const { name, email, password } = req.body;

  try {

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    return res.json({ message: "User registered", user });
  } catch (error) {
    console.log(error, 'Error in Register authController')
  }
};



export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const header = req.body.header.authorization;

  if (!header) return res.status(401).json({ message: 'No token Provided' })
  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }

}