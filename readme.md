# ShortPath - URL Shortener 

## Project Overview
**ShortPath** is a modern, full-stack URL shortening service built with Next.js 16, featuring a dark-themed UI and MongoDB backend integration.

## Technology Stack

### Frontend
- **Framework**: Next.js 16.1.1 (App Router)
- **Runtime**: React 19.2.3
- **Styling**: Tailwind CSS 4
- **Language**: JavaScript (ES6+)

### Backend
- **Runtime**: Node.js (via Next.js API Routes)
- **Database**: MongoDB (Cloud - MongoDB Atlas)
- **ODM**: Mongoose
- **ID Generation**: ShortID library

### Development Tools
- **Package Manager**: npm
- **Linter**: ESLint with Next.js config
- **Build Tool**: Turbopack (Next.js default)

## Architecture

### Project Structure
```
shortpath/
├── app/
│   ├── api/
│   │   └── url/
│   │       ├── shorten/route.js      # POST: Create short URL
│   │       └── allURLs/route.js      # GET: Fetch all URLs
│   ├── [shortid]/page.js             # Dynamic route for redirects
│   ├── page.js                       # Main UI component
│   ├── layout.js                     # Root layout with metadata
│   ├── globals.css                   # Global styles
│   └── favicon.ico                   # Custom SVG favicon
├── lib/
│   ├── db.js                         # Database connection module
│   ├── models/Url.js                 # Mongoose URL schema
│   └── utils.js                      # Utility functions
├── .env.local                        # Environment variables
└── package.json                      # Dependencies & scripts
```

### Database Schema
```javascript
{
  originalUrl: String (required),
  shortid: String (unique, required),
  createdAt: Date (default: now)
}
```

## Features Implemented

### Core Functionality
1. **URL Shortening**
   - Converts long URLs to short, shareable links
   - Auto-adds https:// scheme if missing
   - Validates URL format

2. **Custom Short IDs**
   - Optional user-defined short codes
   - Duplicate prevention with validation
   - Fallback to auto-generated IDs

3. **URL Redirection**
   - Server-side redirects via Next.js dynamic routes
   - 301 permanent redirects for SEO
   - 404 page for invalid short codes

4. **URL Management**
   - View all created short links
   - Sorted by creation date (newest first)
   - Displays original URL, short ID, and creation date
   - Limited to 50 most recent URLs

### User Interface Features
- **Dark Theme**: Professional slate color scheme
- **Responsive Design**: Mobile-first approach
- **Interactive Elements**:
  - One-click copy to clipboard
  - Loading states during API calls
  - Error notifications
  - Success confirmations
- **Advanced Options**: Collapsible custom ID section
- **Statistics Display**: Links created, uptime, performance metrics

### Technical Features
- **Modular Architecture**: Separated concerns (DB, models, utils)
- **Connection Pooling**: Efficient MongoDB connection management
- **Error Handling**: Comprehensive try-catch blocks
- **SEO Optimized**: Custom metadata and favicon
- **Type Safety**: JSDoc comments for documentation

## API Endpoints

### 1. Create Short URL
- **Endpoint**: `POST /api/url/shorten`
- **Request Body**:
  ```json
  {
    "originalUrl": "https://example.com",
    "URLID": "custom-id" // optional
  }
  ```
- **Response**:
  ```json
  {
    "message": "Short URL created successfully",
    "shortUrl": "http://localhost:3000/abc123"
  }
  ```

### 2. Get All URLs
- **Endpoint**: `GET /api/url/allURLs`
- **Response**:
  ```json
  {
    "urls": [
      {
        "_id": "...",
        "originalUrl": "https://example.com",
        "shortid": "abc123",
        "createdAt": "2025-12-30T..."
      }
    ]
  }
  ```

### 3. Redirect Short URL
- **Endpoint**: `GET /[shortid]`
- **Behavior**: 301 redirect to original URL or 404 page

## Environment Configuration

### Development
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Production (Vercel)
Set environment variables in dashboard:
- `MONGODB_URI`: MongoDB connection string
- `NEXT_PUBLIC_BASE_URL`: Production domain (e.g., https://shortpath.vercel.app)

## Performance Optimizations

1. **Database Connection Caching**: Reuses MongoDB connections across requests
2. **React Hooks**: `useCallback` for memoized functions
3. **Lazy Loading**: Dynamic imports where applicable
4. **Optimized Queries**: Indexed `shortid` field for fast lookups
5. **Limited Results**: Caps URL list at 50 entries

## Security Considerations

1. **Input Validation**: URL format checking before storage
2. **Scheme Normalization**: Forces https:// for security
3. **Duplicate Prevention**: Checks existing custom IDs
4. **Error Sanitization**: Generic error messages to users
5. **Environment Variables**: Sensitive data in `.env.local`

## Deployment Strategy

### Platform: Vercel (Recommended)

**Steps**:
1. Push code to GitHub repository
2. Connect GitHub repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy (automatic on push to main branch)

**Environment Variables**:
```
MONGODB_URI = <your-mongodb-connection-string>
NEXT_PUBLIC_BASE_URL = <your-vercel-domain>
```

### Alternative: Railway, Render, Netlify
Compatible with any Next.js hosting platform.

## Future Enhancements

### Planned Features
1. **Analytics Dashboard**
   - Click tracking
   - Geographic data
   - Referrer information
   - Time-based statistics

2. **User Authentication**
   - User accounts
   - Private/public links
   - Link management per user

3. **Advanced Features**
   - QR code generation
   - Link expiration dates
   - Password-protected links
   - Custom domains

4. **Performance**
   - Redis caching layer
   - Rate limiting
   - CDN integration

5. **UI Enhancements**
   - Search/filter URLs
   - Bulk operations
   - Export to CSV
   - Link editing/deletion

## Development Process

### Initial Setup
1. Created Next.js frontend with dark theme
2. Built Express backend separately
3. Connected MongoDB Atlas database

### Migration
4. Merged Express backend into Next.js API routes
5. Removed separate backend server
6. Modularized codebase (db, models, utils)

### Optimization
7. Fixed React hooks dependencies
8. Replaced `<a>` tags with Next.js `<Link>`
9. Removed redundant utility functions
10. Added JSDoc documentation

## Testing Checklist

- [x] URL shortening with auto-generated ID
- [x] URL shortening with custom ID
- [x] Custom ID duplicate prevention
- [x] URL redirection functionality
- [x] 404 page for invalid short codes
- [x] Copy to clipboard feature
- [x] Fetch and display all URLs
- [x] Responsive design on mobile
- [x] Dark theme consistency
- [x] Error handling for network issues

## Known Issues & Limitations

1. **No Authentication**: Anyone can create/view all links
2. **No Rate Limiting**: Vulnerable to spam/abuse
3. **No Analytics**: Cannot track click statistics
4. **No Link Deletion**: URLs persist indefinitely
5. **Case Sensitivity**: Short IDs are case-sensitive

## Dependencies

### Production
```json
{
  "next": "16.1.1",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "mongoose": "^8.9.3",
  "shortid": "^2.2.16"
}
```

### Development
```json
{
  "@tailwindcss/postcss": "^4",
  "babel-plugin-react-compiler": "1.0.0",
  "eslint": "^9",
  "eslint-config-next": "16.1.1",
  "tailwindcss": "^4"
}
```

## Conclusion

ShortPath is a production-ready URL shortener with a modern tech stack, clean architecture, and professional UI. The project demonstrates best practices in:
- Next.js App Router usage
- MongoDB integration
- Modular code organization
- Dark theme implementation
- API route design

The application is ready for deployment to Vercel and can be extended with analytics, authentication, and advanced features as needed.

---

**Project Repository**: https://github.com/dev-aditya-lab/shortpath  
**Developer**: Aditya Gupta  
**Date**: December 30, 2025  
**Version**: 1.0.0
