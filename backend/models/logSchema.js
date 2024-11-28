import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    level: { type: String, required: true },
    message: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
    ipAddress: { type: String },
    device: { type: String },
    os: { type: String },
    browser: { type: String },
    hostname: { type: String },
  },
  { timestamps: true } 
);


logSchema.index({ timestamp: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 }); 

const Log = mongoose.model('Log', logSchema);

export default Log;
