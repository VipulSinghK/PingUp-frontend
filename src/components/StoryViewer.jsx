import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const StoryViewer = ({ viewstory, setViewStory }) => {
  // Expect viewstory to have: { id, username, avatar, stories: [{ id, type: 'image'|'video', url, duration?, backgroundColor? }] }
  const stories = viewstory?.stories || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);

  const currentStory = stories[currentIndex] || {};
  const isVideo = currentStory.type === 'video';
  const defaultDuration = 5000; // ms for images

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0);
    setIsPaused(false);
  }, [currentIndex]);

  // Handle progress animation
  useEffect(() => {
    if (isPaused || stories.length === 0) return;

    let startTime = null;
    const duration = isVideo ? undefined : (currentStory.duration || defaultDuration);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (isVideo) {
        // For videos we rely on video timeupdate instead
        return;
      }

      const prog = Math.min((elapsed / duration) * 100, 100);
      setProgress(prog);

      if (prog < 100) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        goToNext();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [currentIndex, isPaused, currentStory]);

  // Video-specific progress & auto-advance
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideo) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        const prog = (video.currentTime / video.duration) * 100;
        setProgress(prog);
      }
    };

    const handleEnded = () => {
      goToNext();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    // Play when ready
    video.play().catch(() => {});

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.pause();
    };
  }, [currentIndex, isVideo]);

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Close viewer when last story ends (or loop if desired)
      setViewStory(null);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Touch gestures (simplified - left/right tap)
  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = rect.width / 2;

    if (x < half) {
      goToPrevious();
    } else {
      goToNext();
    }
  };

  // Pause on hold / mouse down
  const handlePauseStart = () => setIsPaused(true);
  const handlePauseEnd = () => setIsPaused(false);

  if (!viewstory || stories.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={handleTap}
      onMouseDown={handlePauseStart}
      onMouseUp={handlePauseEnd}
      onTouchStart={handlePauseStart}
      onTouchEnd={handlePauseEnd}
    >
      {/* Background overlay with optional per-story tint */}
      <div
        className="absolute inset-0 opacity-80"
        style={{ backgroundColor: currentStory.backgroundColor || '#000' }}
      />

      {/* Close button */}
      <button
        onClick={() => setViewStory(null)}
        className="absolute top-4 right-4 z-10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
      >
        <X size={28} />
      </button>

      {/* Progress bars (one per story) */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-1">
        {stories.map((story, idx) => (
          <div
            key={story.id || idx}
            className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width:
                  idx < currentIndex
                    ? '100%'
                    : idx === currentIndex
                    ? `${progress}%`
                    : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {/* Story content */}
      <div className="relative w-full max-w-md aspect-[9/16] flex items-center justify-center">
        {isVideo ? (
          <video
            ref={videoRef}
            src={currentStory.url}
            className="w-full h-full object-cover rounded-xl"
            playsInline
            muted // mute by default; add controls if needed
          />
        ) : (
          <img
            src={currentStory.url}
            alt="story"
            className="w-full h-full object-cover rounded-xl"
          />
        )}

        {/* Optional: Text overlay / caption if your story has text */}
        {currentStory.caption && (
          <div className="absolute bottom-12 left-0 right-0 text-center text-white text-lg font-medium px-6">
            {currentStory.caption}
          </div>
        )}

        {/* User info (avatar + name) */}
        <div className="absolute top-12 left-6 flex items-center gap-3 text-white z-10">
          <img
            src={viewstory.avatar}
            alt={viewstory.username}
            className="w-10 h-10 rounded-full border-2 border-white object-cover"
          />
          <span className="font-semibold">{viewstory.username}</span>
        </div>
      </div>

      {/* Navigation arrows (optional - mostly for desktop) */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors hidden md:block"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors hidden md:block"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default StoryViewer;