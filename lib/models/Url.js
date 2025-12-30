import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: { 
    type: String, 
    required: true 
  },
  shortid: { 
    type: String, 
    unique: true, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Url = mongoose.models.Url || mongoose.model('Url', urlSchema);
