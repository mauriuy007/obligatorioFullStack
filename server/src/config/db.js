import mongoose from "mongoose";

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

export async function connectDB() {
  const connection = await mongoose.connect('mongodb://'); // replace with your MongoDB connection string
  if (connection) {
    console.log("Connected to MongoDB");
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const UserSchema = new mongoose.Schema({
  id: Number,
   name: String,
   email: String,
   password: String
});

const BookSchema = new mongoose.Schema({
  id: Number,
   title: String,
   author: String,
    publishedDate: Date
    });

const ReviewSchema = new mongoose.Schema({
    id: Number,
     bookId: Number,
     userId: Number,
     rating: Number,
     comment: String
});

export const UserModel = mongoose.model('User', UserSchema);
export const BookModel = mongoose.model('Book', BookSchema);
export const ReviewModel = mongoose.model('Review', ReviewSchema);