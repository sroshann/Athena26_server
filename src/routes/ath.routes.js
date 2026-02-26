import express from "express";
import { signupCtrl } from "../controller/ath.ctrl.js";
const router = express()

router.post('/signup', signupCtrl)

export default router