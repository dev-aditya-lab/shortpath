import { Url } from '../models/url.model.js';
import shortid from 'shortid';


function ensureHttpScheme(url) {
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}

export async function createURL(req, res) {
    let { originalUrl, URLID } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }
    if (URLID) {
        const existing = await Url.findOne({ shortid: URLID });
        if (existing) {
            return res.status(400).json({ error: 'Custom short ID already in use' });
        }
    }

    originalUrl = ensureHttpScheme(originalUrl.trim());
    const URLshortID = URLID || shortid.generate();

    try {
        const newUrl = new Url({ originalUrl, shortid: URLshortID });
        await newUrl.save();
        return res.status(201).json({
            message: 'Short URL created successfully',
            shortUrl: `${req.protocol}://${req.get('host')}/${newUrl.shortid}`
        });   
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}

export async function redirectURL(req, res) {
    const { shortid } = req.params;

    try {
        const urlEntry = await Url.findOne({ shortid });
        if (urlEntry) {
            return res.redirect(urlEntry.originalUrl);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }   
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}

export async function getAllURLs(req, res) {
    try {
        const urls = await Url.find().select('-__v').sort({ createdAt: -1 });
        return res.status(200).json({ urls });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}