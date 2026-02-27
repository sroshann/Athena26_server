import express from "express";
import { loginCtrl, logOutCtrl, signupCtrl } from "../controller/ath.ctrl.js";
const router = express()

router.post('/signup', signupCtrl)
router.post('/login', loginCtrl)
router.get('/logout', logOutCtrl)

export default router