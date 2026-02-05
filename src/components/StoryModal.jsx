import { ArrowLeft, Image as ImageIcon, Pointer, TextCursor, X } from 'lucide-react';
import React, { useState, useRef } from 'react';

const StoryModal = ({ setShowModal, fetchStories }) => {
  const bgcolors = [
    '#f28b82', // red
    '#fbbc04', // yellow
    '#fff475', // light yellow
    '#ccff90', // light green
    '#a7ffeb', // mint
    '#aecbfa', // light blue
    '#d7aefb', // lavender
    '#fdcfe8', // pink
  ];

  const [mode, setMode] = useState('text'); // 'text' | 'media'
  const [background, setBackground] = useState(bgcolors[0]);
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation 
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload an image or short video (mp4/webm)');
      return;
    }

    // Optional: size limit ~15–25 MB for stories
    if (file.size > 25 * 1024 * 1024) {
      alert('File is too large. Maximum 25 MB allowed.');
      return;
    }

    setMedia(file);
    setPreviewUrl(URL.createObjectURL(file));
    setMode('media');
  };

  const removeMedia = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setMedia(null);
    setPreviewUrl(null);
    setMode('text');
  };

  const handleCreateStory = async () => {
    if (isSubmitting) return;

    // Basic validation
    if (mode === 'text' && text.trim().length === 0) {
      alert('Please write something or add a photo/video.');
      return;
    }
    if (mode === 'media' && !media) {
      alert('Please select a photo or video.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      if (mode === 'media' && media) {
        formData.append('media', media);
        formData.append('type', media.type.startsWith('video') ? 'video' : 'image');
      } else {
        formData.append('type', 'text');
        formData.append('content', text.trim());
        formData.append('background', background);
      }

      // Replace with your real API endpoint
      const response = await fetch('/api/stories', {
        method: 'POST',
        body: formData,
        credentials: 'include', // if using cookies / session auth
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to create story');
      }

      // Success
      await fetchStories();           // refresh stories list
      setShowModal(false);            // close modal

    } catch (err) {
      console.error(err);
      alert(err.message || 'Could not post story. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStoryEmpty = mode === 'text' ? text.trim().length === 0 : !media;

  return (
    <div className="fixed inset-0 z-50 min-h-screen bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <ArrowLeft size={24} color='white' />
          </button>

          <h2 className="text-lg font-semibold text-white">Create Story</h2>

          <div className="w-10" /> {/* spacer for symmetry */}
        </div>

        {/* Content area */}
        <div className="relative aspect-[9/16] max-h-[70vh] bg-black">
          {/* Background / Preview */}
          {mode === 'media' && previewUrl ? (
            <div className="absolute inset-0">
              {media?.type.startsWith('video') ? (
                <video
                  src={previewUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              )}
              <button
                onClick={removeMedia}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                disabled={isSubmitting}
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center p-6 text-center"
              style={{ backgroundColor: background }}
            >
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tap to type..."
                className="w-full h-full bg-transparent text-white text-2xl font-medium outline-none resize-none placeholder:text-white/50 text-center"
                maxLength={280}
                disabled={isSubmitting}
              />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 space-y-4">
          {/* Color picker - only shown in text mode */}
          {mode === 'text' && (
            <div className="flex gap-2 flex-wrap justify-center">
              {bgcolors.map((color) => (
                <button
                  key={color}
                  onClick={() => setBackground(color)}
                  className={`w-9 h-9 rounded-full ring-2 transition-all cursor-pointer ${
                    background === color ? 'ring-white ring-offset-2 ring-offset-gray-900' : 'ring-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  disabled={isSubmitting}
                />
              ))}
            </div>
          )}

          {/* Mode switch + upload */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
              disabled={isSubmitting || mode === 'media'}
            >
              <ImageIcon size={20} color='white'/>
              <span className='text-white cursor-pointer'>Add photo/video</span>
            </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                        onChange={handleMediaUpload}
                        className="hidden"
                    />

            <button
              onClick={handleCreateStory}
              disabled={isStoryEmpty || isSubmitting}
              className={`px-6 py-2 font-semibold rounded-full transition-colors ${
                isStoryEmpty || isSubmitting
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-gray-200 cursor-pointer'
              }`}
            >
              {isSubmitting ? 'Sharing...' : 'Share'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryModal;