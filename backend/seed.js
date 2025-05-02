// seed.js
import mongoose from 'mongoose';
import Project from './models/project.js'; // Path to your Project model
import User from './models/user.js'; // Path to your User model, assuming you're using User for `createdBy`
import dotenv from 'dotenv';
import { connectDB } from "./database/connectDB.js";
// Load environment variables (like MongoDB URI) from `.env` file
dotenv.config();

// Connect to MongoDB


// Seed data function
const seedProjects = async () => {
  try {
    connectDB()
    // Find a user to associate with the projects
    const user = await User.findOne(); // Modify this if you have a specific user

    if (!user) {
      console.log('No user found to associate with the projects');
      return;
    }

    // Define sample projects
    const sampleProjects = [
      {
        title: 'Project 1',
        description: 'Description for Project 1',
        createdBy: user._id, // Associate with a user
      },
      {
        title: 'Project 2',
        description: 'Description for Project 2',
        createdBy: user._id,
      },
      {
        title: 'Project 3',
        description: 'Description for Project 3',
        createdBy: user._id,
      },
    ];

    // Insert projects into the database
    await Project.insertMany(sampleProjects);
    console.log('Projects seeded successfully');
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};

// Run the script
const runSeeder = async () => {
  await connectDB();
  await seedProjects();
  mongoose.connection.close(); // Close the connection after seeding
};

// Execute the seeding process
runSeeder();
