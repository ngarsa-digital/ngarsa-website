"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type VideoShowcaseProps = {
  title: string;
  description: string;
  videoSrc?: string;
  poster?: string;
  badgeLabel: string;
  tagLabel: string;
  caption: string;
  slug: string;
};

export const ServiceVideoShowcase = ({
  title,
  description,
  videoSrc,
  poster,
  badgeLabel,
  tagLabel,
  caption,
  slug,
}: VideoShowcaseProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoFile, setHasVideoFile] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoSrc) return;
    let isMounted = true;
    fetch(videoSrc, { method: "HEAD" })
      .then((res) => {
        if (isMounted) {
          setHasVideoFile(res.ok);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasVideoFile(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [videoSrc]);

  const togglePlay = () => {
    if (hasVideoFile && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!hasVideoFile && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [hasVideoFile, isPlaying]);

  return (
    <div className="w-full my-12">
      <div className="bg-surface-container-lowest brutalist-border brutalist-shadow overflow-hidden flex flex-col">
        {/* HUD Top Bar */}
        <div className="bg-inverse-surface text-surface px-4 py-3 flex flex-wrap items-center justify-between gap-3 border-b-4 border-inverse-surface">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isPlaying ? "bg-error" : "bg-primary-fixed"
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  isPlaying ? "bg-error" : "bg-primary-fixed"
                }`}
              ></span>
            </span>
            <span className="font-label-bold text-label-bold uppercase tracking-wider text-surface">
              {isPlaying ? "SIMULATION ACTIVE" : "SIMULATION PAUSED"}
            </span>
          </div>

          <div className="hidden sm:block">
            <span className="font-label-bold text-label-bold text-surface-variant uppercase tracking-widest text-[11px]">
              ID: {slug.toUpperCase()} {"//"} GOOGLE AI VISUAL CORE
            </span>
          </div>

          <div className="inline-block bg-primary-fixed text-inverse-surface px-2 py-0.5 border-2 border-inverse-surface font-label-bold text-[10px] uppercase tracking-wider rotate-1">
            {tagLabel}
          </div>
        </div>

        {/* Video Canvas / Display Area */}
        <div className="relative w-full aspect-video min-h-80 md:min-h-110 bg-inverse-surface overflow-hidden flex items-center justify-center group">
          {hasVideoFile && videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={poster}
              className="w-full h-full object-cover"
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-linear-to-br from-on-tertiary-fixed via-[#004e5e] to-outline-heavy select-none overflow-hidden">
              {/* Decorative Geometric Grid & Scanlines */}
              <div className="absolute inset-0 pattern-dots text-white/20"></div>
              <div
                className={`absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent h-16 w-full ${
                  isPlaying ? "animate-pulse" : ""
                }`}
              ></div>

              {poster && (
                <div className="absolute inset-0 opacity-20 mix-blend-luminosity pointer-events-none">
                  <Image
                    src={poster}
                    alt={title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Central Dynamic AI Visual HUD */}
              <div className="relative z-10 text-center max-w-xl px-4 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 bg-surface-container-lowest text-on-surface px-4 py-1.5 brutalist-border shadow-[4px_4px_0px_0px_#2e3131] mb-6 -rotate-1">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    smart_toy
                  </span>
                  <span className="font-label-bold text-label-bold uppercase tracking-wider text-[11px]">
                    {badgeLabel}
                  </span>
                </div>

                <h3 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-white mb-3 tracking-tight drop-shadow-md leading-tight wrap-break-word">
                  {title}
                </h3>
                <p className="font-body-md text-body-md text-surface-container-high max-w-md mx-auto line-clamp-3 mb-6 leading-relaxed wrap-break-word">
                  {description}
                </p>

                {/* Big Center Play Trigger Button */}
                <button
                  onClick={togglePlay}
                  className="bg-primary-fixed text-inverse-surface border-4 border-inverse-surface brutalist-shadow hover:scale-105 active:scale-95 transition-all p-5 rounded-full flex items-center justify-center cursor-pointer"
                  aria-label={
                    isPlaying ? "Pause Simulation" : "Play Simulation"
                  }
                >
                  <span className="material-symbols-outlined text-4xl">
                    {isPlaying ? "pause" : "play_arrow"}
                  </span>
                </button>
              </div>

              {/* Corner Watermarks */}
              <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 font-mono text-[11px] text-white/70 bg-black/50 px-2 py-1 border border-white/20">
                <span className="w-2 h-2 rounded-full bg-primary-fixed inline-block"></span>
                <span>{`LATENCY: 12ms // RESOLUTION: 3840x2160`}</span>
              </div>
              <div className="absolute bottom-4 right-4 z-10 hidden sm:block font-mono text-[11px] text-white/70 bg-black/50 px-2 py-1 border border-white/20">
                <span>{`MODEL: GOOGLE AI GENERATIVE REEL`}</span>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-inverse-surface/60 z-20">
            <div
              className="h-full bg-primary-fixed transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Bottom Control Bar & Caption */}
        <div className="p-4 sm:p-6 bg-surface-container-low border-t-4 border-inverse-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-1.5 bg-surface text-on-surface border-2 border-inverse-surface brutalist-shadow-sm px-4 py-2 font-label-bold text-label-bold uppercase hover:bg-primary-fixed transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
              <span>{isPlaying ? "Pause" : "Play Reel"}</span>
            </button>

            {hasVideoFile && (
              <button
                onClick={toggleMute}
                className="inline-flex items-center justify-center w-10 h-10 bg-surface text-on-surface border-2 border-inverse-surface brutalist-shadow-sm hover:bg-primary-fixed transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isMuted ? "volume_off" : "volume_up"}
                </span>
              </button>
            )}

            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play();
                  setIsPlaying(true);
                } else {
                  setProgress(0);
                  setIsPlaying(true);
                }
              }}
              className="inline-flex items-center justify-center w-10 h-10 bg-surface text-on-surface border-2 border-inverse-surface brutalist-shadow-sm hover:bg-primary-fixed transition-colors cursor-pointer"
              aria-label="Restart Simulation"
            >
              <span className="material-symbols-outlined text-[20px]">
                replay
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-[13px]">
            <span className="material-symbols-outlined text-primary text-[18px]">
              info
            </span>
            <span>{caption}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
