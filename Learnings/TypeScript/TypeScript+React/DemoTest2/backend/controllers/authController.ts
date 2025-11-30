import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import PrismaClient from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { hash } from "crypto";
// import { HttpStatusCode } from "axios";

// const users = [
//   {
//     id: 1,
//     username: "admin",
//     password: '$2b$10$XnpYnM9jR6/o7KmjT94gK.EFuLjeV5pavM1J88Z7sEzS/buguhz5m',
//     //password123
//     role: "admin",
//   },
//   {
//     id: 2,
//     username: "user",
//     password: '$2b$10$RjWMetw6KNX/TkGi3Kiz..htM5rE1hkQ4k/H.6u.n.XobCxwxDFuK',
//     //password124
//     role: "user",
//   },
// ];

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { email } });
  // console.log(user,'jkhsdgjkfhsgadjhg')

  if (!user || !password) {
    return res.status(400).json({ message: "Email & password is required" });
  }

  if (!user) {
    return res.status(401).json({ message: 'Invalid Credentials' })
  }
  // const match = await bcrypt.compare(password, user.password);
  const valid = await bcrypt.compare(password, user.password);

  // const user = await prisma.

  if (!valid) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }


  const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '15m' });
  // const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

  // res.cookie("refreshToken", refreshToken, {
  //   httpOnly: true,
  //   secure: false,
  //   sameSite: "lax",
  //   path: '/api/auth/refresh',
  //   maxAge: 7 * 24 * 60 * 60 * 1000
  // });


  // const token = jwt.sign(
  //   { id: user.id, role: user.role },
  //   process.env.JWT_SECRET,
  //   { expiresIn: "1h" }
  // );

  // res.json({
  //   accessToken,
  //   role: user.role,
  // });

  return res.json({
    message: 'Login Successfull',
    accessToken,
    role: user.role,
  })
};



export const refresh = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: "No refresh token" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET! );
    const newAccess = jwt.sign({ id: decoded.id }, process.env.JWT_REFRESH_SECRET! , { expiresIn: '15m' });
    return res.json({ accessToken: newAccess })

  } catch (error) {
    return res.status(403).json({ message: 'Invalid Refresh Token' })
  }

}


export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
  return res.json({ message: 'Logged Out' })

}

export const register = async (req: Request, res: Response) => {

  const { name, email, password } = req.body;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ message: 'Email already in use' })

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  })

  return res.json({ message: 'User Registered', user });


}


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