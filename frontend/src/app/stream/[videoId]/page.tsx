"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from 'next/navigation';
import HLS from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Settings, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/app/lib/utils';

export default function VideoStreamPage() {
    const params = useParams<{ videoId: string }>();
    const videoId = params.videoId;
    const videoRef = useRef<HTMLVideoElement>(null);
    
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    useEffect(() => {
    if (videoId && HLS.isSupported() && videoRef.current) {
        const hls = new HLS();
        
        hls.loadSource(`http://localhost:3000/output/${videoId}/master.m3u8`);
        hls.attachMedia(videoRef.current);
        
        hls.on(HLS.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
    });

    return () => {
        hls.destroy();
    };
    }
}, [videoId]);

    useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
        video.removeEventListener('timeupdate', updateTime);
        video.removeEventListener('loadedmetadata', updateDuration);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('canplay', handleCanPlay);
        };
    }, []);

    const togglePlay = () => {
    if (videoRef.current) {
        if (isPlaying) {
        videoRef.current.pause();
    } else {
        videoRef.current.play();
        }
    }
};

const toggleMute = () => {
    if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }
};

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Video Stream</h1>
          <p className="text-gray-400">Video ID: {videoId}</p>
        </div>

        <div 
          className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl aspect-video"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Video Element */}
          <video 
            ref={videoRef}
            className="w-full h-full object-contain bg-black"
            onClick={togglePlay}
          />

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Controls Overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0"
            )}
          >
            {/* Progress Bar */}
            <div className="absolute bottom-16 left-4 right-4">
              <div 
                className="w-full h-2 bg-gray-600 rounded-full cursor-pointer group"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-150 relative group-hover:h-3"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={skipBackward}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors h-10 w-10 flex items-center justify-center"
                >
                  <SkipBack className="h-5 w-5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors h-12 w-12 flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>

                <button
                  onClick={skipForward}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors h-10 w-10 flex items-center justify-center"
                >
                  <SkipForward className="h-5 w-5" />
                </button>

                <button
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors h-8 w-8 flex items-center justify-center"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>

                <div className="text-white text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="text-white hover:bg-white/20 rounded-full p-2 transition-colors h-8 w-8 flex items-center justify-center">
                  <Settings className="h-4 w-4" />
                </button>

                <button className="text-white hover:bg-white/20 rounded-full p-2 transition-colors h-8 w-8 flex items-center justify-center">
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-6 p-6 bg-gray-900 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-2">Stream Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400">{isLoading ? 'Loading' : 'Ready'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Format:</span>
              <span className="text-white">HLS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Quality:</span>
              <span className="text-white">Adaptive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
