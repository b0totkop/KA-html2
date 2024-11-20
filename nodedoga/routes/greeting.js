import express from 'express'

const router = express.Router()

router.get('/greeting', (req, res) => {
    res.send("Hello, Tóth-Kalocsai Koppány")
})

export default router