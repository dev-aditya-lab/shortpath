import "./globals.css";

export const metadata = {
  title: "ShortPath - URL Shortener",
  description: "Transform long URLs into short, shareable links with custom branding",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%233b82f6;stop-opacity:1' /><stop offset='100%' style='stop-color:%236366f1;stop-opacity:1' /></linearGradient></defs><rect width='100' height='100' rx='20' fill='url(%23grad)'/><path d='M35 45 L45 35 M45 35 L65 35 M65 35 L65 55 M30 70 L40 60 M40 60 L60 60 M60 60 L70 50' stroke='white' stroke-width='8' stroke-linecap='round' fill='none'/></svg>",
        type: "image/svg+xml",
      }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
