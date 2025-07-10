import mongoose, { connect } from "mongoose";


// function to connect monogodb 
export const connectDB = async () => {
    try {
        // event 
        mongoose.connection.on('connected' , ()=> console.log('Database Connected!'));
        // connect
        await mongoose.connect(`${process.env.MONGODB_URI}/blog-app`)
    } catch (error) {
        console.log(error)
    }
}