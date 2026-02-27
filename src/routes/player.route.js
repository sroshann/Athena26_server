import express from 'express'
import { addPlayerCtrl, updtScoreCtrl } from '../controller/player.ctrl.js'
const router = express()

router.post('/addPlayer', addPlayerCtrl)
router.put('/updateScore', updtScoreCtrl)

export default router