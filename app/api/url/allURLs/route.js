import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Url } from '@/lib/models/Url';

export async function GET() {
  try {
    await connectDB();
    const urls = await Url.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ urls });
  } catch (error) {
    console.error('Error fetching URLs:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
