import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

// create app 
const app = express();

// connect to MongoDB
await connectDB();

// define middleware 
app.use(cors())
app.use(express.json())


// define the basic route 
app.get('/' , (req , res) => {
    res.send("Hello from the Node.js Backend!")
})

app.use('/api/admin' , adminRouter);
app.use('/api/blog' , blogRouter)

const PORT = process.env.PORT || 5000;

// Start the Server 
app.listen(PORT , ()=> (
    console.log(`Server is running on PORT : ${PORT}`)
))

export default app;