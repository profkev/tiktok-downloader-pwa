# TikTok Downloader PWA

A Progressive Web App built with Vue 3 + TypeScript for downloading TikTok videos without watermarks.

## Features

- 📱 **Progressive Web App** - Install on any device
- 🎥 **HD Video Downloads** - Multiple quality options
- 🎵 **MP3 Audio Extraction** - Download audio only
- 🚫 **No Watermarks** - Clean video downloads
- 📊 **Download Progress** - Real-time progress tracking
- 🎨 **Tailwind CSS** - Beautiful, responsive design
- ⚡ **Fast & Free** - No registration required

## Tech Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **PWA** with Service Worker
- **Pinia** for state management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tiktok-downloader-pwa
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Usage

1. Open the app in your browser
2. Paste a TikTok video URL
3. Click "Get Video" to fetch video information
4. Choose your preferred quality/format
5. Click "Download" to save the file

## Supported URLs

- `https://www.tiktok.com/@username/video/123456789`
- `https://vm.tiktok.com/ABC123/`
- `https://m.tiktok.com/@username/video/123456789`

## API Integration

The app uses the TikWM API for fetching video data. No API key required for basic functionality.

## PWA Features

- Offline capability
- Install prompt
- App-like experience
- Push notifications (optional)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is for educational purposes only. Please respect TikTok's terms of service and creators' rights when downloading content.