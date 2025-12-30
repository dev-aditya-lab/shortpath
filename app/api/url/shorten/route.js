import { NextResponse } from 'next/server';
import shortid from 'shortid';
import { connectDB } from '@/lib/db';
import { Url } from '@/lib/models/Url';
import { ensureHttpScheme } from '@/lib/utils';

export async function POST(req) {
  try {
    await connectDB();
    const { originalUrl, URLID } = await req.json();

    if (!originalUrl) {
      return NextResponse.json({ error: 'Original URL is required' }, { status: 400 });
    }

    if (URLID) {
      const existing = await Url.findOne({ shortid: URLID });
      if (existing) {
        return NextResponse.json({ error: 'Custom short ID already in use' }, { status: 400 });
      }
    }

    const normalizedUrl = ensureHttpScheme(originalUrl.trim());
    const URLshortID = URLID || shortid.generate();

    const newUrl = new Url({ originalUrl: normalizedUrl, shortid: URLshortID });
    await newUrl.save();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get('origin') || 'http://localhost:3000';

    return NextResponse.json({
      message: 'Short URL created successfully',
      shortUrl: `${baseUrl}/${newUrl.shortid}`
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating short URL:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
