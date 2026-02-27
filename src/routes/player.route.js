import express from 'express'
import { addPlayerCtrl, dltPlayerCtrl, getPlayers, updtScoreCtrl } from '../controller/player.ctrl.js'
import { protectPlyrRoutes } from '../middleware/auth.middleware.js'
const router = express()

router.post('/getPlayers', protectPlyrRoutes, getPlayers)
router.post('/addPlayer', protectPlyrRoutes, addPlayerCtrl)
router.put('/updateScore', protectPlyrRoutes, updtScoreCtrl)
router.delete('/deletePlayer', protectPlyrRoutes, dltPlayerCtrl)

export default router