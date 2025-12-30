# ShortPath - URL Shortener

A modern, production-ready URL shortening service with a sleek dark-themed interface. Transform long URLs into short, shareable links with custom branding options.

![ShortPath](https://img.shields.io/badge/status-active-success.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![Next.js](https://img.shields.io/badge/next.js-16.1.1-black)

## ✨ Features

- **🎨 Modern Dark UI** - Professional, production-grade interface with slate color scheme
- **⚡ Lightning Fast** - Instant URL shortening and redirects
- **🔗 Custom Short URLs** - Create branded short links with custom back-halves
- **📊 Link Management** - View and manage all your shortened URLs in one dashboard
- **🌐 Separate Domain Support** - Use different domains for API and short URLs
- **💾 MongoDB Database** - Scalable data storage with MongoDB Atlas
- **🔒 URL Validation** - Automatic HTTP/HTTPS scheme normalization
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **📋 One-Click Copy** - Quick copy-to-clipboard functionality
- **🚀 Production Ready** - Environment-based configuration for easy deployment

## 🏗️ Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first styling
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **shortid** - Unique ID generation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
shortpath/
├── frontend/              # Next.js frontend application
│   ├── app/
│   │   ├── page.js       # Main URL shortener page
│   │   ├── layout.js     # Root layout with metadata
│   │   └── globals.css   # Global styles
│   ├── .env.local        # Local environment variables
│   └── .env.example      # Environment variable template
│
├── Server/               # Express.js backend API
│   ├── app/
│   │   ├── config/
│   │   │   └── constent.js        # App constants
│   │   ├── controllers/
│   │   │   └── url.contorller.js  # URL logic
│   │   ├── DB/
│   │   │   └── index.db.js        # Database connection
│   │   ├── models/
│   │   │   └── url.model.js       # URL schema
│   │   └── routes/
│   │       └── url.route.js       # API routes
│   ├── app.js            # Express app configuration
│   ├── index.js          # Server entry point
│   └── .env              # Backend environment variables
│
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dev-aditya-lab/shortpath.git
   cd shortpath
   ```

2. **Setup Backend**
   ```bash
   cd Server
   npm install
   ```

   Create `.env` file:
   ```env
   DB_URI=mongodb+srv://username:password@cluster.mongodb.net/shortpathDB
   PORT=8000
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

   Create `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_SHORT_DOMAIN=http://localhost:8000
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd Server
   npm start
   ```
   Backend runs on `http://localhost:8000`

2. **Start Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

3. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 📡 API Endpoints

### Create Short URL
```http
POST /api/url/shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com/very-long-url",
  "URLID": "custom-id" (optional)
}
```

**Response:**
```json
{
  "message": "Short URL created successfully",
  "shortUrl": "http://localhost:8000/abc123"
}
```

### Get All URLs
```http
GET /api/url/allURLs
```

**Response:**
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

### Redirect to Original URL
```http
GET /:shortid
```
Redirects to the original URL

## 🌐 Deployment

### Environment Variables

**Frontend (Next.js):**
- `NEXT_PUBLIC_API_URL` - Backend API endpoint
- `NEXT_PUBLIC_SHORT_DOMAIN` - Domain for displaying short URLs

**Backend (Express):**
- `DB_URI` - MongoDB connection string
- `PORT` - Server port (default: 8000)

### Deploy to Vercel (Frontend)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - `NEXT_PUBLIC_SHORT_DOMAIN`: Your custom short domain
4. Deploy

### Deploy Backend

**Options:**
- **Render**: Connect GitHub repo, set `DB_URI` and `PORT`
- **Railway**: One-click deploy from GitHub
- **Heroku**: Push to Heroku with Procfile
- **AWS/DigitalOcean**: Deploy on VPS with PM2

### Custom Short Domain Setup

To use a custom domain like `short.link`:

1. Deploy backend to `api.yourproject.com`
2. Point your short domain DNS to the backend server
3. Set frontend env variables:
   ```env
   NEXT_PUBLIC_API_URL=https://api.yourproject.com
   NEXT_PUBLIC_SHORT_DOMAIN=https://short.link
   ```

## 🎯 Usage Examples

### Basic URL Shortening
1. Paste your long URL in the input field
2. Click "Shorten" button
3. Copy the generated short URL

### Custom Short URL
1. Click "Advanced options"
2. Enter your desired custom back-half
3. Click "Shorten"
4. Get your custom short URL

### Manage Links
- View all shortened URLs in the dashboard
- Copy any short URL with one click
- Visit original URLs directly from the table

## 🔧 Configuration

### Backend CORS
```javascript
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### URL Scheme Normalization
The backend automatically adds `https://` to URLs without a scheme:
```javascript
function ensureHttpScheme(url) {
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
}
```

## 🛠️ Development

### Backend Development
```bash
cd Server
npm run dev  # with nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # with hot reload
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd Server
npm start
```

## 📝 Database Schema

### URL Model
```javascript
{
  originalUrl: String,    // Original long URL
  shortid: String,        // Unique short ID
  createdAt: Date         // Timestamp
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Aditya Gupta**
-  personal Website: [adityalab.com](https://adityalab.com)
- Email: [hello@devaditya.dev](mailto:hello@devaditya.dev)
- GitHub: [@dev-aditya-lab](https://github.com/dev-aditya-lab)
- Repository: [shortpath](https://github.com/dev-aditya-lab/shortpath)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database solution
- Tailwind CSS for the styling utilities
- All contributors and users of ShortPath

---

⭐ Star this repository if you find it helpful!
