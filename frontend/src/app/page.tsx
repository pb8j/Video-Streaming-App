import Link from "next/link";
import { Video, Upload, Play, Zap, Shield, Monitor } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Adaptive Video Streaming
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience seamless video streaming with automatic quality adjustment based on your connection speed. 
              Upload, stream, and enjoy high-quality video content anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/videoupload"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
              >
                <Upload className="h-5 w-5" />
                <span>Upload Video</span>
              </Link>
              <Link
                href="/stream/demo"
                className="inline-flex items-center space-x-2 border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need for professional video streaming
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="bg-blue-600 rounded-lg p-3 w-fit mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Adaptive Bitrate</h3>
            <p className="text-gray-400">
              Automatically adjusts video quality based on available bandwidth for smooth playback without buffering.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="bg-green-600 rounded-lg p-3 w-fit mb-4">
              <Video className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">HLS Streaming</h3>
            <p className="text-gray-400">
              Industry-standard HTTP Live Streaming for reliable video delivery across all devices and platforms.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="bg-purple-600 rounded-lg p-3 w-fit mb-4">
              <Monitor className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Modern Player</h3>
            <p className="text-gray-400">
              Beautiful, responsive video player with intuitive controls and a sleek dark theme interface.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="bg-red-600 rounded-lg p-3 w-fit mb-4">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibized text-white mb-3">Easy Upload</h3>
            <p className="text-gray-400">
              Simple drag-and-drop interface with progress tracking and support for all common video formats.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="bg-yellow-600 rounded-lg p-3 w-fit mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Secure Delivery</h3>
            <p className="text-gray-400">
              Encrypted video segments and secure token-based authentication for protected content delivery.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="bg-indigo-600 rounded-lg p-3 w-fit mb-4">
              <Play className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Multiple Formats</h3>
            <p className="text-gray-400">
              Support for MP4, AVI, MOV, and other popular video formats with automatic transcoding.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Upload your first video and experience the power of adaptive streaming
          </p>
          <Link
            href="/videoupload"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
          >
            <Upload className="h-5 w-5" />
            <span>Start Uploading</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Adaptive Video Streaming. Built with Next.js and HLS.js
          </p>
        </div>
      </footer>
    </div>
  );
}
