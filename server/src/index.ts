import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import './config/db'
import quotesRouter from "./routes/quotes";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use("/api/quotes", quotesRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ufanisi API is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})

export default app