import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect('mongodb://localhost/challenge', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}