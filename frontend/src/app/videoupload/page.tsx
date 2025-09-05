"use client";

import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Upload, Video, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function VideoUpload() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    processFile(file);
  };

  const processFile = async (file: File) => {
    setSelectedFile(file);
    setIsUploading(true);
    setUploadStatus('idle');
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("video", file);

      const response = await axios.post(
        'http://localhost:3000/api/v1/videos/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(progress);
          }
        }
      );

      setVideoUrl(response.data.url || response.data.videoId);
      setUploadStatus('success');
    } catch (error) {
      console.log("Something went wrong", error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Upload Your Video</h1>
          <p className="text-gray-400 text-lg">
            Upload your video file to start adaptive bitrate streaming
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-8 shadow-2xl">
          {/* Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              dragActive
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!isUploading && !selectedFile && (
              <>
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Drop your video here or click to browse
                </h3>
                <p className="text-gray-400 mb-6">
                  Supports MP4, AVI, MOV, and other common video formats
                </p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept="video/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Choose File
                </button>
              </>
            )}

            {isUploading && (
              <div className="space-y-4">
                <Loader className="h-12 w-12 text-blue-500 animate-spin mx-auto" />
                <h3 className="text-xl font-semibold text-white">Uploading...</h3>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-gray-400">{uploadProgress}% complete</p>
              </div>
            )}

            {uploadStatus === 'success' && selectedFile && (
              <div className="space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <h3 className="text-xl font-semibold text-green-400">Upload Successful!</h3>
                <div className="bg-gray-800 rounded-lg p-4 text-left">
                  <div className="flex items-center space-x-3 mb-2">
                    <Video className="h-5 w-5 text-gray-400" />
                    <span className="text-white font-medium">{selectedFile.name}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Size: {formatFileSize(selectedFile.size)}
                  </div>
                  {videoUrl && (
                    <div className="mt-3">
                      <a
                        href={`/stream/${videoUrl}`}
                        className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        <span>Watch Video</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="space-y-4">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                <h3 className="text-xl font-semibold text-red-400">Upload Failed</h3>
                <p className="text-gray-400">
                  There was an error uploading your video. Please try again.
                </p>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setUploadStatus('idle');
                    setUploadProgress(0);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Upload Guidelines */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-gray-800 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Upload className="h-6 w-6 text-blue-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Easy Upload</h4>
              <p className="text-gray-400 text-sm">
                Drag and drop or click to select your video file
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-gray-800 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Video className="h-6 w-6 text-green-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Adaptive Streaming</h4>
              <p className="text-gray-400 text-sm">
                Automatic quality adjustment based on connection speed
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-gray-800 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">High Quality</h4>
              <p className="text-gray-400 text-sm">
                Optimized encoding for the best viewing experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
