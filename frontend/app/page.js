'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customId, setCustomId] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allUrls, setAllUrls] = useState([]);
  const [copied, setCopied] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const fetchAllUrls = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/url/allURLs`);
      const data = await res.json();
      setAllUrls(data.urls || []);
    } catch (err) {
      console.error('Failed to fetch URLs:', err);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchAllUrls();
  }, [fetchAllUrls]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    if (!originalUrl.trim()) {
      setError('Please enter a URL');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/url/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalUrl: originalUrl.trim(),
          URLID: customId.trim() || undefined
        })
      });

      const data = await res.json();

      if (res.ok) {
        setShortUrl(data.shortUrl);
        setOriginalUrl('');
        setCustomId('');
        setShowAdvanced(false);
        fetchAllUrls();
      } else {
        setError(data.error || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Network error. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(''), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white">ShortPath</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition">Dashboard</a>
              <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition">Analytics</a>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-linear-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-5xl font-bold text-white mb-4">
            Shorten Your Links,<br />Amplify Your Reach
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Create powerful short links with custom branding and real-time analytics
          </p>

          {/* Main URL Form */}
          <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-8 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="Paste your long URL here..."
                  className="flex-1 px-5 py-4 text-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : 'Shorten'}
                </button>
              </div>

              {/* Advanced Options */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 mx-auto transition"
              >
                <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Advanced options
              </button>

              {showAdvanced && (
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-slate-400 whitespace-nowrap">
                      Custom back-half:
                    </label>
                    <div className="flex items-center flex-1 border border-slate-700 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 bg-slate-800">
                      <span className="px-3 py-2 bg-slate-900 text-slate-500 text-sm border-r border-slate-700">
                        {API_BASE}/
                      </span>
                      <input
                        type="text"
                        value={customId}
                        onChange={(e) => setCustomId(e.target.value)}
                        placeholder="custom-link"
                        className="flex-1 px-3 py-2 bg-slate-800 text-white placeholder-slate-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-950/50 border border-red-800 rounded-lg flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-red-300">{error}</span>
                </div>
              )}

              {shortUrl && (
                <div className="mt-4 p-5 bg-linear-to-r from-green-950/50 to-emerald-950/50 border border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold text-green-300">Your short link is ready!</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-green-900/50">
                    <a 
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-blue-400 hover:text-blue-300 font-medium truncate transition"
                    >
                      {shortUrl}
                    </a>
                    <button
                      onClick={() => copyToClipboard(shortUrl)}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-500 transition flex items-center gap-2"
                    >
                      {copied === shortUrl ? (
                        <>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Copied
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{allUrls.length}</div>
              <div className="text-sm text-slate-400">Links Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-slate-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">Fast</div>
              <div className="text-sm text-slate-400">Redirects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Links List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Your Links</h3>
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Search links..."
              className="px-4 py-2 bg-slate-900 border border-slate-800 text-white placeholder-slate-500 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <select className="px-4 py-2 bg-slate-900 border border-slate-800 text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option>All links</option>
              <option>Active</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        {allUrls.length === 0 ? (
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-16 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">No links yet</h4>
            <p className="text-slate-400">Create your first short link to get started</p>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-950 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Short Link</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Original URL</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {allUrls.map((url) => (
                    <tr key={url._id} className="hover:bg-slate-800/50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-semibold text-blue-400">/{url.shortid}</code>
                          <button
                            onClick={() => copyToClipboard(`${API_BASE}/${url.shortid}`)}
                            className="p-1 hover:bg-slate-700 rounded transition"
                            title="Copy link"
                          >
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <a 
                          href={url.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-400 hover:text-blue-400 max-w-md truncate block transition"
                          title={url.originalUrl}
                        >
                          {url.originalUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-400">
                          {url.createdAt ? formatDate(url.createdAt) : 'Recently'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`${API_BASE}/${url.shortid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition"
                            title="Visit link"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                          <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition" title="More options">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              © 2025 ShortPath. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition">API</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
