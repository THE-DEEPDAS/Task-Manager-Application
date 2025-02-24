import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Task Schema
const taskSchema = new mongoose.Schema({
  task_name: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: Number, required: true },
  deadline: { type: String, required: true },
  dependencies: { type: String, default: 'None' },
  status: { 
    type: String, 
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  created_at: { type: Date, default: Date.now }
});

export const TaskModel = mongoose.model('Task', taskSchema);
