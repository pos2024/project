import dotenv from 'dotenv';
dotenv.config();
import winston from 'winston';
import 'winston-mongodb';
import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error("MONGO_URI is not set in the environment variables.");
}

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.MongoDB({
      db: mongoUri,
      collection: 'logs',
      storeHost: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    })
  ]
});

const applyTTLIndex = async () => {
    try {
      const db = mongoose.connection.db;
      const collection = db.collection('logs');
  
      // Get current indexes
      const indexes = await collection.indexes();
      console.log('Current indexes:', indexes);
  
      // Drop the existing index if it exists
      const existingIndex = indexes.find(index => index.name === 'timestamp_1');
      if (existingIndex) {
        console.log('Dropping existing timestamp_1 index');
        await collection.dropIndex('timestamp_1');
      }

      // Create a new TTL index on timestamp
      await collection.createIndex({ timestamp: 1 }, { expireAfterSeconds: 10 });

      console.log("TTL index successfully applied to 'logs' collection.");
    } catch (error) {
      console.error("Error applying TTL index:", error);
    }
};

mongoose.connection.once('open', () => {
  applyTTLIndex();
});

export default logger;
