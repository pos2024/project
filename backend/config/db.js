import mongoose from 'mongoose';
import chalk from 'chalk';
import logger from './logger.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
      
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        console.error(chalk.red.bold(`Error: ${error.message}`));
        process.exit(1);
    }
};

export default connectDB;
