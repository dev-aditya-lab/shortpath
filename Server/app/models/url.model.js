import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortid: { type: String, default: shortid.generate, unique: true },
    createdAt: { type: Date, default: Date.now }  
});

const Url = mongoose.model('Url', urlSchema);
export { Url };