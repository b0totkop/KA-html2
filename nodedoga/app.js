import express from 'express'

import homeRoutes from './routes/home.js'
import expressRoutes from './routes/express.js'
import greetingRoutes from './routes/greeting.js'
import nodejsRoutes from './routes/nodejs.js'

const app = express()
const PORT = 3000

/*app.get('/', (req, res) => {
    res.send("<h2>Hi, there!</h2>")
})*/

app.get('/', homeRoutes)
app.get('/express', expressRoutes)
app.get('/greeting', greetingRoutes)
app.get('/nodejs', nodejsRoutes)

app.listen(PORT, () => console.log(`server runs on port: http://localhost:${PORT}`))