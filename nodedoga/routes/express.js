import express from 'express'

const router = express.Router()

router.get('/express', (req, res) => {
    res.send("Az Express egy minimalista webes keretrendszer, amely a Node.js-hez készült.")
})

export default router