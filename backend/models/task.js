import mongoose from 'mongoose';

// Task schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  priority: {
    type: String,
    required: true,
    enum: ['Low' , 'Medium', 'High'],
    default: 'Low'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', 
    required: true,
  },
  completedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
