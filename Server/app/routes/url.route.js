import express from 'express';
import { createURL, getAllURLs, redirectURL } from '../controllers/url.contorller.js';
const router = express.Router();

router.post("/shorten", createURL);
router.get("/allURLs", getAllURLs);

export default router;