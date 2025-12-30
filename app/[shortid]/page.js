import { redirect } from 'next/navigation';
import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { Url } from '@/lib/models/Url';
import { ensureHttpScheme } from '@/lib/utils';

async function getUrl(shortid) {
  try {
    await connectDB();
    const urlEntry = await Url.findOne({ shortid });
    console.log(`Looking for shortid: "${shortid}"`, urlEntry ? 'Found' : 'Not found');
    return urlEntry;
  } catch (error) {
    console.error('Error fetching URL:', error);
    return null;
  }
}

export default async function RedirectPage({ params }) {
  const { shortid } = await params;
  
  console.log('Redirect page accessed with shortid:', shortid);
  
  try {
    const urlEntry = await getUrl(shortid);
    
    if (urlEntry) {
      // Redirect will throw NEXT_REDIRECT - this is normal Next.js behavior
      redirect(ensureHttpScheme(urlEntry.originalUrl));
    }
    
    console.log('URL entry not found in database');
  } catch (error) {
    // Ignore NEXT_REDIRECT errors (expected behavior)
    if (error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error('Error redirecting:', error);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-slate-400 mb-6">Short URL not found</p>
        <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
          Go Home
        </Link>
      </div>
    </div>
  );
}
