const mongoose = require('mongoose');

async function connectDB() {
    try{
        await mongoose.connect('mongodb+srv://instaclone:6EOUyarbinuGQe0z@cluster0.hh6xvjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("mongodb connected");
        
    }
    catch(err){
        console.log('Database connection failed',err.message);
        process.exit(1);
        
    }
}
module.exports = {connectDB};