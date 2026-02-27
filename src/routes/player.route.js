import express from 'express'
import { addPlayerCtrl, dltPlayerCtrl, getPlayers, updtScoreCtrl } from '../controller/player.ctrl.js'
const router = express()

router.get('/getPlayers', getPlayers)
router.post('/addPlayer', addPlayerCtrl)
router.put('/updateScore', updtScoreCtrl)
router.delete('/deletePlayer', dltPlayerCtrl)

export default router