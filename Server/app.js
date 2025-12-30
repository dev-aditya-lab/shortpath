import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import urlRoute from './app/routes/url.route.js';

app.get('/', (req, res) => {
    res.send('Welcome to the Short Path API');
});

app.use("/api/url", urlRoute);
app.get("/:shortid", async (req, res, next) => {
    const { redirectURL } = await import('./app/controllers/url.contorller.js');
    redirectURL(req, res, next);
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

export {app};