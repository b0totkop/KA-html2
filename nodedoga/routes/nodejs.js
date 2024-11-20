import express from 'express'

const router = express.Router()

router.get('/nodejs', (req, res) => {
    res.send("A Node.js egy olyan szerveroldali JavaScript futtatókörnyezet, amely a V8 JavaScript motorra épül.")
})

export default router