import express from "express";
import { login, refresh, logout, authMiddleware, register } from "../controllers/authController";
import { adminMiddleware } from "../middleware/adminMiddleware";
// import { authMiddleware } from "../controllers/authController";

const router = express.Router();

router.post('/register', register)
router.post("/login", login);
router.post('/profile', authMiddleware, (req: any, res) => {
  res.json({ id: req.user.id, role: req.user.role });
})

router.get('/admin-data', authMiddleware, adminMiddleware, (req: any, res) => {

})

router.post("/refresh", refresh);
router.post("/logout", logout);



export default router;
