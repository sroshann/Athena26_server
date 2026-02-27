import express from "express";
import { getUserData, loginCtrl, logOutCtrl, signupCtrl } from "../controller/ath.ctrl.js";
import { protectPlyrRoutes } from "../middleware/auth.middleware.js";
const router = express()

router.post('/signup', signupCtrl)
router.post('/login', loginCtrl)
router.get('/logout', logOutCtrl)
router.post('/getUserData', protectPlyrRoutes, getUserData)

export default router